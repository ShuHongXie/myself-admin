### 快捷命令指南

1. nest -h 查看命令帮助
2. nest g xxx [name] [path]生成命名为name值的文件/模块
3. 一次生成单个文件夹下的controller，service，module

```js
nest g res auth /modules
```

### nestjs

- 执行顺序：客户端请求 → 中间件 → 守卫（Guard） → 拦截器（进入前） → 控制器方法 → 拦截器（退出后） → 过滤器（Exception Filter） → 客户端响应

### 概念

1.  Entity: 数据库表的 “映射”，定义数据在数据库中的存储结构（字段名、类型、约束等）。
2.  Dto: 定义接口交互时的数据格式（请求参数 / 响应结果），用于数据验证和格式约束。
3.  Vo: 定义请求Response的格式
