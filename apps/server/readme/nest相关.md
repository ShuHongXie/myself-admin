### nest文件初始化命令

```js

nest g controller auth // 生成controller
nest g service auth // 生成service
nest g module auth // 生成module
```

### 异常过滤

https://nest.nodejs.cn/exception-filters

### 响应拦截

https://nest.nodejs.cn/interceptors

### sequelize时间问题

如果没有在sequelizeModule处增加配置项，那时间会不准，需要增加以下配置

```js
timezone: '+8:00', // 代表东八区
dialectOptions: {
  useUTC: false, // 使用utc时间
},
```

### 登录公钥和私钥生成(加密功能最后做)

```js
// 在特定路径下生成公钥
openssl genpkey -algorithm RSA -out /Users/xiexiaoxie/my/reggie-nest/readme/RSA/private.pem -pkeyopt rsa_keygen_bits:2048

// 利用私钥生成公钥
openssl rsa -in /Users/xiexiaoxie/my/reggie-nest/readme/RSA/private.pem -pubout -out /Users/xiexiaoxie/my/reggie-nest/readme/RSA/public.pem
```

### dto入参文档

![class-validator](https://github.com/typestack/class-validator)