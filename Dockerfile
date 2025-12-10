# 构建阶段
FROM node:20-alpine as build-stage
WORKDIR /web-test
# 定义构建参数（默认值为prod，防止参数缺失）
ARG BUILD_ENV=prod
# 复制依赖文件
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com
# 复制所有代码
COPY ./apps/web/ ./
# 根据构建参数执行不同打包命令
RUN if [ "$BUILD_ENV" = "test" ]; then npm run build:test; else npm run build:prod; fi

# 运行阶段
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 