## （第一步）选择的原因列举几个

- swagger 文档支持
- 日志支持
- 错误处理支持
- config 配置
- 监控
- jwt 的 token 令牌支持以及鉴权
- 基于 mysql 的讲解
- 还有其他 pipe、权限控制、邮件服务、jwt 的 token 令牌支持以及鉴权、任务队列、文件上传文件下载等等

### 1、swagger 文档支持

- OpenAPI(Swagger)规范是一种用于描述 RESTful API 的强大定义格式。 Nest 提供了一个专用模块来使用它。

- 首先，您必须安装所需的包：

```
npm install --save @nestjs/swagger swagger-ui-express
```

- 如果你正在使用 fastify ，你必须安装 fastify-swagger 而不是 swagger-ui-express ：

```
npm install --save @nestjs/swagger fastify-swagger
```

- 配置 nestjs/swagger

官网地址：https://docs.nestjs.cn/9/recipes?id=%e8%b7%af%e7%94%b1%e6%a8%a1%e5%9d%97

### 2、日志支持
