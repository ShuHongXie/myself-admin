### docker相关

```yml
### 安装docker
https://cloud.tencent.com/developer/article/2053492

### docker命令
# 1. 查看Docker服务状态
sudo systemctl status docker
# 2. 若状态显示“inactive（dead）”，启动服务
sudo systemctl start docker
# 3. 设置开机自启（避免重启后再次出现问题）
sudo systemctl enable docker
# 4. 查看容器日志
docker logs -f 容器名
###

### docker-compose命令
启动服务（后台）	sudo docker-compose up -d
停止服务（不删除容器 / 数据）	sudo docker-compose stop
重启服务	sudo docker-compose restart
查看服务日志（实时）	sudo docker-compose logs -f mysql5.6
停止并删除容器（数据仍在，因挂载了本地目录）	sudo docker-compose down
查看容器状态	sudo docker-compose ps
进入容器终端	sudo docker-compose exec mysql5.6 bash

### linux操作步骤
### 1.统一把数据放在/data/docker目录下，防止删除镜像后数据丢失
sudo mkdir -p /data/gitlab/data /data/gitlab/logs /data/gitlab/config
# 2.手动拉取所有镜像（按配置文件中的image字段）
docker pull gitlab/gitlab-ce:latest
docker pull mysql:8.0
docker pull node:20-alpine
docker pull nginx:alpine
```

### docker-compose相关

```yml
### 安装docker compose
sudo curl -L "https://mirrors.aliyun.com/docker-compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
### 配置docker compose国内镜像
# 创建目录
mkdir -p /etc/docker

# 复制内容
tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://mirrors.tuna.tsinghua.edu.cn",
        "http://mirrors.sohu.com",
        "https://ustc-edu-cn.mirror.aliyuncs.com",
        "https://ccr.ccs.tencentyun.com",
        "https://docker.m.daocloud.io",
        "https://docker.awsl9527.cn"
    ]
}
EOF

# 重新加载配置
systemctl daemon-reload

# 重启Docker
systemctl restart docker

# 启动/关闭 docker-compose
docker compose up/down -d [容器名]

```

```yml
# 容器操作
docker ps | grep [容器名] # 查看容器
```
