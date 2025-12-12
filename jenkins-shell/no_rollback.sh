#!/bin/bash
# ====================== 核心配置 & 工具函数（必须放在最前面）======================
# 调整set -e，增加pipefail兼容，且放在函数定义后避免提前终止
# set -eo pipefail  
# 确保能找到 docker 命令

COMPOSE_CMD="docker compose"

# 工具函数（必须最先定义，避免调用时找不到）
log_info() { echo -e "\033[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; }
log_error() { echo -e "\033[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; exit 1; }
log_warn() { echo -e "\033[32m[WARN] $(date +'%Y-%m-%d %H:%M:%S'): $1\033[0m"; }
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

# ====================== 1. 环境信息输出 ======================
log_info "当前npm版本：$(npm -v)"
log_info "当前Node.js版本：$(node -v)"
log_info "当前WORKSPACE路径：${WORKSPACE}"  # 修复：删除中文分号
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

# ====================== 2. 核心配置 ======================
REGISTRY_PREFIX=""
IMAGE_TAG="${BRANCH_NAME#*/}"  # 提取分支标识（如*/web-test→web-test）
BUILD_NAME="${IMAGE_TAG%-*}" # 提取服务表示，比如web-test提取文本web
COMPOSE_FILE="/data/ci-cd/docker-compose.yml"  # 唯一的compose文件

# ====================== 3. 解析分支信息 ======================
IMAGE_NAME="${REGISTRY_PREFIX}${BRANCH_ID}"
log_info "当前分支：${BRANCH_NAME} → 分支标识：${BRANCH_ID}"
log_info "镜像名：${IMAGE_NAME}"

# 匹配对应的Dockerfile（适配拆分后的文件）
DOCKERFILE_PATH="${WORKSPACE}/Dockerfile.${APP_NAME}"
if [ ! -f "${DOCKERFILE_PATH}" ]; then
    log_error "Dockerfile不存在：${DOCKERFILE_PATH}（需创建Dockerfile.web/Dockerfile.server）"
fi

# ====================== 4. 清理旧资源 ======================
# 停止旧服务（加调试，输出执行的完整命令）
log_info "执行停止服务命令：docker compose -f ${COMPOSE_FILE} --profile ${BRANCH_ID} down"
${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" down || log_info "停止旧服务失败（可能服务未启动）"

# 删除旧镜像（加调试）
log_info "执行删除镜像命令：docker rmi -f ${IMAGE_NAME}"
docker rmi -f "${IMAGE_NAME}" || log_info "旧镜像${IMAGE_NAME}不存在，无需删除"

# ====================== 5. 构建镜像 ======================
log_info "构建镜像：${IMAGE_NAME}"
docker build \
  --build-arg BUILD_ENV="${BUILD_ENV}" \
  --build-arg BUILD_NAME="${BUILD_NAME}" \
  -t "${IMAGE_NAME}" \
  -f "${DOCKERFILE_PATH}" \
  "${WORKSPACE}" || log_error "镜像构建失败！"

# ====================== 6. 启动当前分支对应的服务 ======================
log_info "启动${BRANCH_ID}分支服务（通过profile筛选）..."
# 复用已检测的COMPOSE_CMD，避免重复判断
${COMPOSE_CMD} -f "${COMPOSE_FILE}" --profile "${BRANCH_ID}" up -d --force-recreate || log_error "compose启动失败！"

# ====================== 7. 验证服务状态 ======================
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

log_info "✅ 分支【${BRANCH_ID}】镜像构建+部署全流程完成！"