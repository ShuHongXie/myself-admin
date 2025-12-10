# 构建阶段
FROM node:20-alpine as build-stage
# 开启构建失败立即终止，避免掩盖错误
RUN set -e
WORKDIR /web-test
# 定义构建参数（默认值为prod，防止参数缺失）
ARG BUILD_ENV=prod
# 打印构建环境，方便调试
RUN echo "当前构建环境: ${BUILD_ENV}"
# 复制依赖文件（利用Docker缓存，仅package.json变化时重新install）
COPY ./apps/web/package*.json ./
# 安装依赖，使用国内源，添加--no-cache减少缓存
RUN npm install --registry=https://registry.npmmirror.com --no-cache
# 复制所有代码（apps/web下的内容到/web-test）
COPY ./apps/web/ ./
# 根据构建参数执行不同打包命令（优化判断写法，更易读）
RUN if [ "${BUILD_ENV}" = "test" ]; then \
        npm run build:test; \
    else \
        npm run build:prod; \
    fi

# 运行阶段
FROM nginx:alpine as production-stage
# 复制构建产物（修正路径：从/web-test/dist复制，而非/app/dist）
COPY --from=build-stage /web-test/dist /usr/share/nginx/html
# 复制nginx配置（若本地无nginx.conf，可注释此行或提前创建默认配置）
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 暴露端口
EXPOSE 80
# 启动nginx（保持前台运行）
CMD ["nginx", "-g", "daemon off;"]
#