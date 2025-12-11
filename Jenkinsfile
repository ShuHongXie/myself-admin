pipeline {
    // 指定执行节点（需包含 docker/docker-compose 环境，可自定义标签）
    agent { label 'docker-node' }  // 若无标签可改为 agent any

    // 环境变量定义（对应原脚本核心配置）
    environment {
        COMPOSE_CMD = 'docker compose'
        COMPOSE_FILE = '/data/ci-cd/docker-compose.yml'
        // Jenkins 内置变量，无需手动定义：WORKSPACE（工作空间路径）
    }

    // 构建参数（适配原脚本的分支逻辑，WEBHOOK_BRANCH 通常由 Git Webhook 自动传入）
    parameters {
        // 手动选择分支（备用，优先级低于 Webhook 传入的分支）
        string(
            name: 'BRANCH',
            defaultValue: 'main',
            description: '手动指定构建分支（如 web-test/web-prod/server-test/server-prod）'
        )
        // Webhook 自动解析的分支（优先级更高，可由 GitLab/GitHub Webhook 填充）
        string(
            name: 'WEBHOOK_BRANCH',
            defaultValue: '',
            description: 'Git Webhook 传入的分支名（自动填充，无需手动输入）'
        )
    }

    // 核心阶段
    stages {
        // 阶段1：环境信息输出 & 分支解析（核心逻辑复用原脚本）
        stage('Env Info & Branch Parse') {
            steps {
                script {
                    // 定义 Bash 工具函数 + 分支解析逻辑（复用原脚本）
                    sh '''#!/bin/bash
                        set -eo pipefail  # 错误终止，兼容管道失败

                        # 复用原脚本工具函数
                        log_info() { echo -e "\\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }
                        log_error() { echo -e "\\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; exit 1; }
                        log_warn() { echo -e "\\033[33m[WARN] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }

                        # 端口检测函数（复用原脚本）
                        check_port() {
                            local host="$1"
                            local port="$2"
                            timeout 5 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null && return 0 || return 1
                        }

                        # 输出环境信息
                        log_info "当前npm版本：$(npm -v)"
                        log_info "当前Node.js版本：$(node -v)"
                        log_info "当前WORKSPACE路径：${WORKSPACE}"

                        # 分支优先级：WEBHOOK_BRANCH > 手动BRANCH
                        if [ -n "${WEBHOOK_BRANCH}" ]; then
                          BRANCH_NAME="${WEBHOOK_BRANCH}"
                        else
                          BRANCH_NAME="${BRANCH}"
                        fi
                        log_info "当前构建分支名称：${BRANCH_NAME}"
                        BRANCH_ID="${BRANCH_NAME##*/}"  # 提取分支标识（如 refs/heads/web-test → web-test）

                        # 分支规则匹配 + 固定端口映射（核心逻辑）
                        case "${BRANCH_ID}" in
                            "web-test")
                                APP_NAME="web"
                                BUILD_ENV="test"
                                SERVICE_PORT="8081"
                                ;;
                            "web-prod")
                                APP_NAME="web"
                                BUILD_ENV="prod"
                                SERVICE_PORT="8082"
                                ;;
                            "server-test")
                                APP_NAME="server"
                                BUILD_ENV="test"
                                SERVICE_PORT="8083"
                                ;;
                            "server-prod")
                                APP_NAME="server"
                                BUILD_ENV="prod"
                                SERVICE_PORT="8084"
                                ;;
                            *)
                                log_error "分支名不符合规则！仅支持：web-test/web-prod/server-test/server-prod"
                                ;;
                        esac

                        # 将关键变量写入文件，供后续阶段读取（Pipeline跨Shell步骤传递变量）
                        echo "BRANCH_ID=${BRANCH_ID}" > ${WORKSPACE}/.env_branch
                        echo "APP_NAME=${APP_NAME}" >> ${WORKSPACE}/.env_branch
                        echo "BUILD_ENV=${BUILD_ENV}" >> ${WORKSPACE}/.env_branch
                        echo "SERVICE_PORT=${SERVICE_PORT}" >> ${WORKSPACE}/.env_branch
                        echo "IMAGE_NAME=${BRANCH_ID}" >> ${WORKSPACE}/.env_branch  # REGISTRY_PREFIX为空，镜像名=分支ID
                        echo "DOCKERFILE_PATH=${WORKSPACE}/Dockerfile.${APP_NAME}" >> ${WORKSPACE}/.env_branch

                        # 输出解析结果
                        log_info "分支标识：${BRANCH_ID} | 应用名：${APP_NAME} | 构建环境：${BUILD_ENV} | 绑定端口：${SERVICE_PORT}"
                        log_info "镜像名：${BRANCH_ID} | Dockerfile路径：${WORKSPACE}/Dockerfile.${APP_NAME}"
                    '''
                }
            }
        }

        // 阶段2：清理旧资源（停止旧服务 + 删除旧镜像）
        stage('Clean Old Resources') {
            steps {
                script {
                    // 读取上一阶段的变量
                    def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                    def BRANCH_ID = branchEnv.BRANCH_ID
                    def IMAGE_NAME = branchEnv.IMAGE_NAME

                    // 执行清理逻辑
                    sh '''#!/bin/bash
                        set -eo pipefail
                        log_info() { echo -e "\\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }

                        # 停止旧服务
                        log_info "执行停止服务命令：${COMPOSE_CMD} -f ${COMPOSE_FILE} --profile ''' + BRANCH_ID + ''' down"
                        ${COMPOSE_CMD} -f ${COMPOSE_FILE} --profile ''' + BRANCH_ID + ''' down || log_info "停止旧服务失败（可能服务未启动）"

                        # 删除旧镜像
                        log_info "执行删除镜像命令：docker rmi -f ''' + IMAGE_NAME + '''"
                        docker rmi -f ''' + IMAGE_NAME + ''' || log_info "旧镜像''' + IMAGE_NAME + '''不存在，无需删除"
                    '''
                }
            }
        }

        // 阶段3：构建镜像（校验Dockerfile + 构建）
        stage('Build Docker Image') {
            steps {
                script {
                    def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                    def IMAGE_NAME = branchEnv.IMAGE_NAME
                    def BUILD_ENV = branchEnv.BUILD_ENV
                    def BUILD_NAME = branchEnv.APP_NAME  # 对应原脚本BUILD_NAME="${IMAGE_TAG%-*}"
                    def DOCKERFILE_PATH = branchEnv.DOCKERFILE_PATH

                    sh '''#!/bin/bash
                        set -eo pipefail
                        log_info() { echo -e "\\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }
                        log_error() { echo -e "\\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; exit 1; }

                        # 校验Dockerfile是否存在
                        if [ ! -f "''' + DOCKERFILE_PATH + '''" ]; then
                            log_error "Dockerfile不存在：''' + DOCKERFILE_PATH + '''（需创建Dockerfile.web/Dockerfile.server）"
                        fi

                        # 构建镜像
                        log_info "开始构建镜像：''' + IMAGE_NAME + '''"
                        docker build \
                          --build-arg BUILD_ENV="''' + BUILD_ENV + '''" \
                          --build-arg BUILD_NAME="''' + BUILD_NAME + '''" \
                          -t "''' + IMAGE_NAME + '''" \
                          -f "''' + DOCKERFILE_PATH + '''" \
                          "''' + WORKSPACE + '''" || log_error "镜像构建失败！"

                        log_info "镜像''' + IMAGE_NAME + '''构建成功！"
                    '''
                }
            }
        }

        // 阶段4：启动服务（Compose Up）
        stage('Start Service') {
            steps {
                script {
                    def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                    def BRANCH_ID = branchEnv.BRANCH_ID

                    sh '''#!/bin/bash
                        set -eo pipefail
                        log_info() { echo -e "\\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }
                        log_error() { echo -e "\\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; exit 1; }

                        # 启动分支对应的服务（Profile筛选）
                        log_info "启动''' + BRANCH_ID + '''分支服务（通过profile筛选）..."
                        ${COMPOSE_CMD} -f ${COMPOSE_FILE} --profile ''' + BRANCH_ID + ''' up -d --force-recreate || log_error "Compose启动失败！"
                    '''
                }
            }
        }

        // 阶段5：验证服务状态（容器运行 + 端口监听）
        stage('Verify Service Status') {
            steps {
                script {
                    def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                    def BRANCH_ID = branchEnv.BRANCH_ID
                    def SERVICE_PORT = branchEnv.SERVICE_PORT
                    def CONTAINER_NAME = BRANCH_ID  # 容器名=分支标识

                    sh '''#!/bin/bash
                        set -eo pipefail
                        log_info() { echo -e "\\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }
                        log_error() { echo -e "\\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; exit 1; }
                        log_warn() { echo -e "\\033[33m[WARN] $(date +'%Y-%m-%d %H:%M:%S'): $1\\033[0m"; }
                        check_port() {
                            local host="$1"
                            local port="$2"
                            timeout 5 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null && return 0 || return 1
                        }

                        # 等待服务启动
                        sleep 3

                        # 检查容器是否运行
                        if docker ps --filter "name=''' + CONTAINER_NAME + '''" --format "{{.Status}}" | grep -q "Up"; then
                            log_info "✅ ''' + BRANCH_ID + '''服务启动成功！容器名：''' + CONTAINER_NAME + ''' | 绑定端口：''' + SERVICE_PORT + '''"
                            # 验证端口监听
                            if check_port 127.0.0.1 ''' + SERVICE_PORT + '''; then
                                log_info "✅ 端口''' + SERVICE_PORT + '''已监听，服务可用！"
                            else
                                log_warn "⚠️ 容器启动成功，但端口''' + SERVICE_PORT + '''未监听（可能服务内部未启动）"
                            fi
                        else
                            # 输出容器日志后退出
                            log_error "❌ ''' + BRANCH_ID + '''服务启动失败！容器日志：$(docker logs --tail 100 ''' + CONTAINER_NAME + ''' 2>&1)"
                        fi

                        log_info "✅ 分支【''' + BRANCH_ID + '''】镜像构建+部署全流程完成！"
                    '''
                }
            }
        }
    }

    // 后置操作（成功/失败处理）
    post {
        // 构建成功通知
        success {
            script {
                def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                def BRANCH_ID = branchEnv.BRANCH_ID
                echo "✅ 分支【${BRANCH_ID}】构建部署全流程执行成功！"
                // 可选：添加钉钉/企业微信通知
                // sh 'curl -X POST https://your-notify-url -d "分支${BRANCH_ID}部署成功"'
            }
        }

        // 构建失败处理
        failure {
            script {
                def branchEnv = readProperties file: "${WORKSPACE}/.env_branch"
                def BRANCH_ID = branchEnv.BRANCH_ID
                echo "❌ 分支【${BRANCH_ID}】构建部署失败！"
                // 输出容器日志（便于排查）
                sh "docker logs --tail 200 ${BRANCH_ID} || true"
                // 可选：失败通知
                // sh 'curl -X POST https://your-notify-url -d "分支${BRANCH_ID}部署失败"'
            }
        }

        // 无论成功失败，清理临时文件
        always {
            sh "rm -f ${WORKSPACE}/.env_branch || true"
        }
    }
}
