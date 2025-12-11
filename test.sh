#!/bin/bash
# ====================== 核心配置 & 工具函数（必须放在最前面）======================
# 调整set -e，增加pipefail兼容，且放在函数定义后避免提前终止
# set -eo pipefail
# 确保能找到 docker 命令
COMPOSE_CMD="docker compose"

# 工具函数（必须最先定义，避免调用时找不到）
log_info() { echo -e "\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; }
log_error() { echo -e "\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; exit 1; }
log_warn() { echo -e "\033[33m[WARN] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; } # 修正警告色为黄色

# 定义端口检测函数（无依赖）
check_port() {
    local host="$1"
    local port="$2"
    # Bash 内置 /dev/tcp 检测端口，超时 5 秒
    if timeout 5 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null; then
        return 0  # 端口监听
    else
        return 1  # 端口未监听
    fi
}

# 新增：回滚核心函数
rollback_service() {
    local branch_id="${BRANCH_ID}"
    local rollback_version="${1}"
    local image_base="${REGISTRY_PREFIX}${branch_id}"
    local record_file="/var/ci-cd/rollback-${branch_id}.log"

    # 检查版本记录文件是否存在
    if [ ! -f "${record_file}" ]; then
        log_error "版本记录文件不存在：${record_file}，无历史版本可回滚！"
    fi

    # 如果未指定回滚版本，取上一个版本（最后一行的上一行）
    if [ -z "${rollback_version}" ]; then
        # 获取所有非空版本记录，取倒数第二个（最后一个是当前版本）
        rollback_version=$(grep -v "^$" "${record_file}" | tail -n 2 | head -n 1)
        if [ -z "${rollback_version}" ]; then
            log_error "无可用的历史版本可回滚！版本记录：$(cat ${record_file})"
        fi
        log_info "未指定回滚版本，默认回滚到上一个版本：${rollback_version}"
    fi

    # 检查回滚版本的镜像是否存在
    if ! docker images "${image_base}:${rollback_version}" --format "{{.ID}}" | grep -q .; then
        log_error "回滚版本${rollback_version}的镜像不存在：${image_base}:${rollback_version}！"
    fi

    # 停止当前服务
    log_info "停止${branch_id}当前服务..."
    ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${branch_id}" down || log_info "停止当前服务失败（可能服务未启动）"

    # 将回滚版本设为latest（保持compose使用latest标签）
    log_info "将${image_base}:${rollback_version}设为latest标签..."
    docker tag "${image_base}:${rollback_version}" "${image_base}:latest" || log_error "镜像打标签失败！"

    # 启动回滚后的服务
    log_info "启动回滚版本${rollback_version}的${branch_id}服务..."
    ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${branch_id}" up -d --force-recreate || log_error "回滚后服务启动失败！"

    # 验证回滚后的服务状态
    log_info "验证回滚版本${rollback_version}的服务状态..."
    sleep 3
    if docker ps --filter "name=${branch_id}" --format "{{.Status}}" | grep -q "Up"; then
        log_info "✅ ${branch_id}服务回滚到版本${rollback_version}成功！绑定端口：${SERVICE_PORT}"
        # 验证端口
        if check_port 127.0.0.1 "${SERVICE_PORT}"; then
            log_info "✅ 端口${SERVICE_PORT}已监听，回滚后的服务可用！"
        else
            log_warn "⚠️ 容器启动成功，但端口${SERVICE_PORT}未监听（可能服务内部未启动）"
        fi
    else
        log_error "❌ ${branch_id}服务回滚失败！容器日志：$(docker logs --tail 100 ${branch_id} 2>&1)"
    fi

    # 可选：更新版本记录（将回滚版本移到最后，标记为当前活跃版本）
    sed -i "/^${rollback_version}$/d" "${record_file}"
    echo "${rollback_version}" >> "${record_file}"
    log_info "✅ 版本记录已更新，当前活跃版本：${rollback_version}"
}

# ====================== 1. 解析脚本参数（新增：区分部署/回滚）=====================
ACTION="${1:-deploy}"  # 默认执行deploy，支持：deploy/rollback
ROLLBACK_VERSION="${2:-}"  # 回滚的版本号（可选，不填则回滚上一个版本）

# ====================== 2. 环境信息输出 ======================
log_info "当前npm版本：$(npm -v)"
log_info "当前Node.js版本：$(node -v)"
log_info "当前WORKSPACE路径：${WORKSPACE}"
# 优先使用 Webhook 解析的分支，否则用手动选择的 BRANCH，最后默认 main
if [ -n "$WEBHOOK_BRANCH" ]; then
  BRANCH_NAME="$WEBHOOK_BRANCH"
else
  BRANCH_NAME="$BRANCH"
fi

echo "当前构建分支名称：$BRANCH_NAME"
BRANCH_ID="${BRANCH_NAME##*/}"

# 严格匹配分支规则 + 固定端口映射（核心修改点）
case "${BRANCH_ID}" in
    "web-test")
        APP_NAME="web"
        BUILD_ENV="test"
        SERVICE_PORT="8081"  # web-test固定8081
        ;;
    "web-prod")
        APP_NAME="web"
        BUILD_ENV="prod"
        SERVICE_PORT="8082"  # web-prod固定8082
        ;;
    "server-test")
        APP_NAME="server"
        BUILD_ENV="test"
        SERVICE_PORT="8083"  # server-test固定8083
        ;;
    "server-prod")
        APP_NAME="server"
        BUILD_ENV="prod"
        SERVICE_PORT="8084"  # server-prod固定8084
        ;;
    *)
        log_error "分支名不符合规则！仅支持：web-test/web-prod/server-test/server-prod"
        ;;
esac

# ====================== 3. 核心配置（新增：版本管理）=====================
REGISTRY_PREFIX=""
# 生成唯一版本号（优先用CI构建号，无则用时间戳，保证版本唯一）
BUILD_ID="${CI_PIPELINE_ID:-$(date +%Y%m%d%H%M%S)}"
# 镜像标签规则：分支ID:latest（当前活跃版）、分支ID:版本号（历史版）
IMAGE_BASE="${REGISTRY_PREFIX}${BRANCH_ID}"
IMAGE_TAG_LATEST="${IMAGE_BASE}:latest"
IMAGE_TAG_VERSION="${IMAGE_BASE}:${BUILD_ID}"

COMPOSE_FILE="/data/ci-cd/docker-compose.yml"  # 唯一的compose文件
# 新增：版本记录文件（每个分支独立）
ROLLBACK_RECORD="/var/ci-cd/rollback-${BRANCH_ID}.log"
# 确保版本记录目录存在
mkdir -p /var/ci-cd

# ====================== 4. 解析分支信息 ======================
log_info "当前分支：${BRANCH_NAME} → 分支标识：${BRANCH_ID}"
log_info "镜像基础名：${IMAGE_BASE} | 本次版本号：${BUILD_ID}"

# 匹配对应的Dockerfile（适配拆分后的文件）
DOCKERFILE_PATH="${WORKSPACE}/Dockerfile.${APP_NAME}"
if [ ! -f "${DOCKERFILE_PATH}" ]; then
    log_error "Dockerfile不存在：${DOCKERFILE_PATH}（需创建Dockerfile.web/Dockerfile.server）"
fi

# ====================== 5. 脚本入口（新增：区分部署/回滚）=====================
case "${ACTION}" in
    "deploy")
        log_info "====================== 开始执行【部署】流程 ======================"

        # ====================== 6. 清理旧资源（修改：不再删除所有旧镜像）=====================
        # 停止旧服务（加调试，输出执行的完整命令）
        log_info "执行停止服务命令：docker compose -f ${COMPOSE_FILE} --profile ${BRANCH_ID} down"
        ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" down || log_info "停止旧服务失败（可能服务未启动）"

        # 优化：仅清理过旧的历史镜像（保留最近5个），不删除当前版本
        log_info "清理${IMAGE_BASE}的过旧镜像（保留最近5个）"
        docker images "${IMAGE_BASE}" --format "{{.Tag}}" | grep -v "latest" | sort | head -n -5 | while read -r old_tag; do
            if [ -n "${old_tag}" ]; then
                docker rmi -f "${IMAGE_BASE}:${old_tag}" || log_info "旧镜像${IMAGE_BASE}:${old_tag}删除失败（可能已被删除）"
            fi
        done

        # ====================== 7. 构建镜像（修改：打双标签）=====================
        log_info "构建镜像：${IMAGE_TAG_LATEST} / ${IMAGE_TAG_VERSION}"
        docker build \
          --build-arg BUILD_ENV="${BUILD_ENV}" \
          --build-arg BUILD_NAME="${BUILD_NAME}" \
          -t "${IMAGE_TAG_LATEST}" \
          -t "${IMAGE_TAG_VERSION}" \
          -f "${DOCKERFILE_PATH}" \
          "${WORKSPACE}" || log_error "镜像构建失败！"

        # ====================== 8. 启动当前分支对应的服务 ======================
        log_info "启动${BRANCH_ID}分支服务（通过profile筛选）..."
        ${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" up -d --force-recreate || log_error "compose启动失败！"

        # ====================== 9. 验证服务状态 ======================
        log_info "验证${BRANCH_ID}分支服务状态..."
        sleep 3

        # 容器名统一规则：分支标识（如web-test）
        CONTAINER_NAME="${BRANCH_ID}"
        # 检查容器是否运行
        if docker ps --filter "name=${CONTAINER_NAME}" --format "{{.Status}}" | grep -q "Up"; then
            log_info "✅ ${BRANCH_ID}服务启动成功！容器名：${CONTAINER_NAME} | 绑定端口：${SERVICE_PORT}"
            # 验证端口是否监听
            if check_port 127.0.0.1 "${SERVICE_PORT}"; then
                log_info "✅ 端口${SERVICE_PORT}已监听，服务可用！"
            else
                log_warn "⚠️ 容器启动成功，但端口${SERVICE_PORT}未监听（可能服务内部未启动）"
            fi
        else
            log_error "❌ ${BRANCH_ID}服务启动失败！容器日志：$(docker logs --tail 100 ${CONTAINER_NAME} 2>&1)"
        fi

        # ====================== 10. 记录版本（新增）=====================
        echo "${BUILD_ID}" >> "${ROLLBACK_RECORD}"
        # 只保留最近10个版本，避免文件过大
        tail -n 10 "${ROLLBACK_RECORD}" > "${ROLLBACK_RECORD}.tmp" && mv "${ROLLBACK_RECORD}.tmp" "${ROLLBACK_RECORD}"
        log_info "✅ 版本${BUILD_ID}已记录到${ROLLBACK_RECORD}"

        log_info "✅ 分支【${BRANCH_ID}】镜像构建+部署全流程完成！当前版本：${BUILD_ID}"
        ;;

    "rollback")
        log_info "====================== 开始执行【回滚】流程 ======================"
        rollback_service "${ROLLBACK_VERSION}"
        ;;

    *)
        log_error "无效的操作！支持的操作：
  1. 部署：./脚本名.sh deploy
  2. 回滚（默认上一个版本）：./脚本名.sh rollback
  3. 回滚（指定版本）：./脚本名.sh rollback 20250520123456"
        ;;
esac
