#!/bin/bash
# ====================== 核心配置（无 latest 标签）======================
# set -eo pipefail
# set -u

COMPOSE_CMD="docker compose"

# 工具函数（极简版）
log_info() { echo -e "\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; }
log_error() { echo -e "\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; exit 1; }
log_warn() { echo -e "\033[33m[WARN] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; }

# 端口检测函数
check_port() {
    local host="$1"
    local port="$2"
    timeout 5 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null && return 0 || return 1
}

# ====================== 强制拉取分支最新代码 ======================
pull_latest_code() {
    log_info "====================== 拉取分支最新代码 ====================="
    # 切换到工作区根目录
    cd "${WORKSPACE:-.}" || log_error "工作区目录不存在：${WORKSPACE}"
    
    # 初始化git（首次构建可能无.git目录）
    if [ ! -d .git ]; then
        log_warn "工作区无.git目录，初始化git仓库并关联远程"
        git init
        git remote add origin https://github.com/ShuHongXie/minilo || log_warn "远程仓库已关联，忽略"
    fi

    # 强制拉取最新代码（覆盖本地缓存）
    git fetch origin --force || log_error "git fetch失败！"
    git checkout "${BRANCH_NAME:-}" || log_error "切换分支${BRANCH_NAME}失败！"
    git pull origin "${BRANCH_NAME:-}" --force || log_error "git pull最新代码失败！"

    # 验证最新提交
    log_info "✅ 拉取最新代码完成，当前分支最新提交："
    git log -1 --pretty=format:"%H %s"
}

# ====================== 回滚核心函数（无 latest 标签）======================
rollback_service() {
    local branch_id="${BRANCH_ID}"
    local rollback_version="${1}"
    local image_base="${IMAGE_NAME}"  # 如 web-test/web-prod
    local record_file="/var/ci-cd/rollback-${branch_id}.log"

    # 基础校验：版本记录文件存在
    if [ ! -f "${record_file}" ]; then
        log_error "版本记录文件不存在：${record_file}，无历史版本可回滚！"
    fi

    # 自动选上一版本（未指定时）
    if [ -z "${rollback_version}" ]; then
        rollback_version=$(grep -v "^$" "${record_file}" | tail -n 2 | head -n 1)
        if [ -z "${rollback_version}" ]; then
            log_error "无可用历史版本回滚！当前记录：$(cat ${record_file})"
        fi
        log_info "自动选择回滚版本：${rollback_version}"
    fi

    # 校验镜像是否存在（仅校验带版本号的镜像）
    local rollback_image="${image_base}:${rollback_version}"
    if ! docker images "${rollback_image}" --format "{{.ID}}" | grep -q .; then
        log_error "回滚版本镜像不存在：${rollback_image}！"
    fi

    # 核心回滚步骤：停止服务 → 传版本号启动
    log_info "停止${branch_id}服务..."
    ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${branch_id}" down || log_warn "停止服务失败（可能未启动）"

    log_info "启动回滚版本：${rollback_image}"
    # 关键：通过环境变量 IMAGE_VERSION 传给 Compose，指定镜像版本
    IMAGE_VERSION="${rollback_version}" ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${branch_id}" up -d --force-recreate || log_error "回滚启动失败！"

    # 验证容器+端口
    sleep 3
    if docker ps --filter "name=^/${branch_id}$" --format "{{.Status}}" | grep -q "Up"; then
        log_info "✅ 容器启动成功！验证端口${SERVICE_PORT}..."
        if check_port 127.0.0.1 "${SERVICE_PORT}"; then
            log_info "✅ 端口${SERVICE_PORT}监听正常，回滚完成！当前版本：${rollback_version}"
        else
            log_warn "⚠️ 容器运行但端口${SERVICE_PORT}未监听"
        fi
    else
        log_error "❌ 回滚失败！容器未运行，日志：$(docker logs --tail 100 ${branch_id} 2>&1)"
    fi

    # 更新版本记录
    sed -i "/^${rollback_version}$/d" "${record_file}"
    echo "${rollback_version}" >> "${record_file}"
    tail -n 10 "${record_file}" > "${record_file}.tmp" && mv "${record_file}.tmp" "${record_file}"
    log_info "✅ 版本记录已更新，当前活跃版本：${rollback_version}"
}

# ====================== 环境解析（保留原有逻辑）======================
log_info "当前npm版本：$(npm -v)"
log_info "当前Node.js版本：$(node -v)"
log_info "当前WORKSPACE路径：${WORKSPACE}"  # 修复：删除中文分号
# 分支解析（兼容 WEBHOOK_BRANCH/BRANCH）
if [ -n "$WEBHOOK_BRANCH" ]; then
  BRANCH_NAME="$WEBHOOK_BRANCH"
else
  BRANCH_NAME="$BRANCH"
fi
BRANCH_ID="${BRANCH_NAME##*/}"
log_info "当前分支：${BRANCH_NAME} → ${BRANCH_ID}"


# 分支+端口映射（完全保留你的逻辑）
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
    "docs")
        APP_NAME="docs"
        BUILD_ENV="docs"
        SERVICE_PORT="8085"
        ;;
    *)
        log_error "分支仅支持：web-test/web-prod/server-test/server-prod"
        ;;
esac

# 镜像配置（无 latest 标签，仅版本号）
IMAGE_TAG="${BRANCH_NAME#*/}"
BUILD_NAME="${IMAGE_TAG%-*}"
COMPOSE_FILE="/data/ci-cd/docker-compose.yml"  # 你的 Compose 路径
BUILD_ID="${BUILD_NUMBER:-$(date +%Y%m%d%H%M%S)}"  # 版本号（Jenkins构建号/时间戳）
IMAGE_NAME="${BRANCH_ID}"  # 如 web-test/web-prod
IMAGE_WITH_VERSION="${IMAGE_NAME}:${BUILD_ID}"  # 带版本号的镜像名（如 web-test:123）
ROLLBACK_RECORD="/var/ci-cd/rollback-${BRANCH_ID}.log"  # 版本记录文件

# 目录初始化（极简）
mkdir -p /var/ci-cd
if [ -n "${JENKINS_HOME:-}" ] && [ ! -w /var/ci-cd ]; then
    sudo chown -R jenkins:jenkins /var/ci-cd || log_warn "手动执行：sudo chown -R jenkins:jenkins /var/ci-cd"
fi

# Dockerfile校验（保留原有）
WORKSPACE="${WORKSPACE:-.}"
DOCKERFILE_PATH="${WORKSPACE}/Dockerfile.${APP_NAME}"
if [ ! -f "${DOCKERFILE_PATH}" ]; then
    log_error "Dockerfile不存在：${DOCKERFILE_PATH}"
fi

# ====================== 脚本入口（部署/回滚分开触发）======================
ACTION="${ACTION:-deploy}"  # 从Jenkins参数取，默认deploy
ROLLBACK_VERSION="${ROLLBACK_VERSION:-}"  # 从Jenkins参数取，默认空

case "${ACTION}" in
    "deploy")
        log_info "====================== 执行部署流程（无 latest 标签）====================="
        # 停止旧服务
        log_info "停止旧服务：${COMPOSE_CMD} -f ${COMPOSE_FILE} --profile ${BRANCH_ID} down"
        ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" down || log_warn "停止旧服务失败"

        # 清理过旧镜像（保留最近5个版本，避免磁盘占满）
        log_info "清理过旧镜像（保留最近5个版本）"
        docker images "${IMAGE_NAME}" --format "{{.Tag}}" | sort -n | head -n -5 | while read -r old_tag; do
            [ -n "${old_tag}" ] && docker rmi -f "${IMAGE_NAME}:${old_tag}" || true
        done

        # 构建镜像（仅打版本号标签，无 latest）
        log_info "构建镜像：${IMAGE_WITH_VERSION}"
        docker build \
          --build-arg BUILD_ENV="${BUILD_ENV}" \
          --build-arg BUILD_NAME="${BUILD_NAME}" \
          -t "${IMAGE_WITH_VERSION}" \
          -f "${DOCKERFILE_PATH}" \
          "${WORKSPACE}" || log_error "镜像构建失败！"

        # 启动服务（关键：传 IMAGE_VERSION 环境变量给 Compose）
        log_info "启动服务：${IMAGE_WITH_VERSION}"
        IMAGE_VERSION="${BUILD_ID}" ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" up -d --force-recreate || log_error "启动失败！"

        # 验证容器+端口
        sleep 3
        CONTAINER_NAME="${BRANCH_ID}"
        if docker ps --filter "name=^/${CONTAINER_NAME}$" --format "{{.Status}}" | grep -q "Up"; then
            log_info "✅ 容器启动成功！验证端口${SERVICE_PORT}..."
            if check_port 127.0.0.1 "${SERVICE_PORT}"; then
                log_info "✅ 端口监听正常，部署完成！当前版本：${BUILD_ID}"
            else
                log_warn "⚠️ 容器运行但端口未监听"
            fi
        else
            log_error "❌ 部署失败！容器未运行：$(docker logs --tail 100 ${CONTAINER_NAME} 2>&1)"
        fi

        # 记录版本（用于后续回滚）
        echo "${BUILD_ID}" >> "${ROLLBACK_RECORD}"
        tail -n 10 "${ROLLBACK_RECORD}" > "${ROLLBACK_RECORD}.tmp" && mv "${ROLLBACK_RECORD}.tmp" "${ROLLBACK_RECORD}"
        log_info "✅ 版本${BUILD_ID}已记录：${ROLLBACK_RECORD}"
        ;;

    "rollback")
        log_info "====================== 执行回滚流程（无 latest 标签）====================="
        rollback_service "${ROLLBACK_VERSION}"
        ;;

    *)
        log_error "仅支持：deploy（部署）/ rollback（回滚）"
        ;;
esac