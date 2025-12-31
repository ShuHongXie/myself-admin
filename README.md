# Minilo - 企业级后台管理系统基础模板

> 一个开箱即用的现代化后台管理系统完整解决方案，采用 Monorepo 架构，集成了前后端最佳实践。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5+-green)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0+-646cff)](https://vitejs.dev/)

## ✨ 项目亮点

| 特性                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| 🏗️ **Monorepo 架构** | 采用 pnpm workspaces，统一管理前后端代码和共享库 |
| 🎨 **独立组件库**    | UI 组件库已完全独立，支持单独维护和发布          |
| 📚 **完整文档**      | 包含详细的组件文档和使用示例                     |
| 🌍 **国际化方案**    | 内置 i18n，支持多语言切换                        |
| 🚀 **现代技术栈**    | Vue 3 + TypeScript + Vite，支持最新特性          |
| 🔐 **权限体系**      | 完善的前后端权限管理系统                         |

## 📦 项目架构

```
minilo/                                    # 根目录
├── apps/                                 # 应用层
│   ├── web/                             # Vue3 管理后台（2000+ 组件）
│   └── server/                          # NestJS 后端服务
│
├── packages/                            # 共享包（可独立发布）
│   ├── ui/                              # UI 组件库 ⭐（已独立部署）
│   │   ├── src/components/              # 所有 UI 组件
│   │   ├── docs/                        # 组件文档（VitePress）
│   │   └── dist/                        # 构建产物
│   │
│   ├── core/                            # 核心布局组件
│   │   └── src/                         # Layout、Menu 等
│   │
│   ├── store/                           # Pinia 状态管理
│   │   └── src/modules/                 # User、Config、Routes stores
│   │
│   ├── locales/                         # 国际化配置
│   │   └── src/                         # 多语言文件
│   │
│   ├── types/                           # 全局类型定义
│   │   └── src/                         # TypeScript 接口
│   │
│   └── utils/                           # 工具函数库
│       ├── config/                      # 配置类（StorageManager、Guider 等）
│       ├── func/                        # 工具函数
│       ├── hooks/                       # Vue Hooks
│       └── request/                     # HTTP 请求封装
│
├── pnpm-workspace.yaml                  # Workspace 配置
├── turbo.jsonc                          # Turbo 构建缓存配置
└── package.json                         # 根依赖和脚本命令
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 10.13

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/ShuHongXie/minilo.git
cd minilo

# 2. 安装依赖
pnpm install

# 3. 启动开发服务
pnpm dev:web           # 启动管理后台
pnpm dev:server        # 启动后端服务
```

## 💻 开发命令

### 本地开发

```bash
# 启动 Web 应用（http://localhost:5173）
pnpm dev:web

# 启动后端服务（http://localhost:3000）
pnpm dev:server

# 启动 UI 组件库文档（http://localhost:5175）
cd packages/ui && pnpm docs:dev
```

### 项目构建

```bash
# 全量构建所有包
pnpm build

# 构建特定应用或包
pnpm build --filter=apps/web      # 仅构建前端
pnpm build --filter=apps/server    # 仅构建后端
pnpm build --filter=@minilo/ui    # 仅构建 UI 组件库
```

### 代码质量

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

## 📚 核心子包详解

### @minilo/ui - 组件库 ⭐

独立维护的 UI 组件库，包含以下核心组件：

- **数据展示**: MlChart（图表）、MlTable（表格）、MlDetail（详情）
- **数据输入**: MlSearch（搜索）、MlForm（表单）、MlTreeSelect（树形选择）
- **交互组件**: MlVirtualList（虚拟列表）、MlButton（按钮）
- **选择器**: MlTreeSelectDialog（对话框树选择）、MlTreeSelectDrawer（抽屉树选择）
- **复杂组件**: MlImageUploadPro（高级上传）

📖 **完整文档**: [http://1.12.51.201:8085/](http://1.12.51.201:8085/)

### @minilo/core - 核心布局

提供完整的布局系统和导航组件：

- Layout（主布局容器）
- NestedMenu（嵌套菜单）
- Breadcrumb（面包屑导航）
- TabBar（标签栏）

### @minilo/store - 状态管理

基于 Pinia 的状态管理，包含：

- `useUserStore` - 用户信息管理
- `useConfigStore` - 应用配置管理
- `useRoutesStore` - 路由和菜单管理
- 支持本地持久化存储

### @minilo/locales - 国际化

多语言支持配置：

- 中文（简体、繁体）
- 英文
- 支持自定义语言扩展

### @minilo/utils - 工具库

实用工具函数和类：

| 模块          | 功能                                           |
| ------------- | ---------------------------------------------- |
| **request**   | HTTP 请求封装，支持拦截器和重试                |
| **config**    | StorageManager（本地存储）、Guider（应用配置） |
| **func**      | 常用工具函数（深拷贝、类型判断等）             |
| **hooks**     | Vue 组合式 API 钩子                            |
| **constrant** | 常量定义                                       |

### @minilo/types - 类型定义

全局 TypeScript 类型，包括：

- 菜单项类型
- 用户信息类型
- API 响应类型
- 应用配置类型

## 🛠️ 完整技术栈

### 前端技术

```
Vue 3.5+              核心框架
TypeScript 5.8+       类型系统
Vite 7.0              构建工具
Element Plus 2.10     UI 组件库
Pinia 3.0             状态管理
Vue Router 4.5        路由管理
Axios                 HTTP 客户端
@vueuse/core          Composition API 工具库
```

### 后端技术

```
NestJS                框架
TypeORM               ORM
PostgreSQL/MySQL      数据库（可选）
JWT                   身份验证
```

### 开发工具

```
pnpm 10.13           包管理器
Turbo                构建加速
ESLint               代码检查
Prettier             代码格式化
TypeScript Compiler   类型检查
VitePress            文档生成
```

## 🎯 核心特性详解

### 1. Monorepo 管理

- 统一依赖版本管理
- 共享代码和类型定义
- 高效的构建和发布流程
- 支持包级别的独立发布

### 2. 权限系统

- 前端路由权限控制
- 后端 API 权限验证
- 动态菜单生成
- 角色和权限定义

### 3. 国际化支持

- 内置中英文支持
- 动态语言切换
- 支持自定义语言扩展
- 日期、时间、数字本地化

### 4. 响应式布局

- 自适应网格系统
- 移动端友好
- 深色/浅色主题切换
- 自定义主题颜色

### 5. 高性能优化

- 组件级代码分割
- 智能预加载
- 虚拟列表支持
- 图片懒加载

## 📖 项目文档

| 文档       | 链接                                                 |
| ---------- | ---------------------------------------------------- |
| 组件库文档 | [http://1.12.51.201:8085/](http://1.12.51.201:8085/) |
| 快速开始   | `/docs/GETTING_STARTED.md`                           |
| 项目架构   | `/docs/ARCHITECTURE.md`                              |
| 开发指南   | `/docs/DEVELOPMENT.md`                               |

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 ESLint 和 Prettier 配置
- 使用 TypeScript 类型注解
- 编写必要的注释和文档
- 提交前运行 `pnpm lint && pnpm format`

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

## 📮 联系方式

- GitHub: [@ShuHongXie](https://github.com/ShuHongXie)
- 组件库文档: [http://1.12.51.201:8085/](http://1.12.51.201:8085/)

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue 3](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [NestJS](https://nestjs.com/)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
