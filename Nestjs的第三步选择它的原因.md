## （第一步）选择 nestjs 的原因列举几个

- swagger 文档支持
- 日志支持
- 错误处理支持
- config 配置
- 监控
- jwt 的 token 令牌支持以及鉴权
- 基于 mysql 的讲解
- 还有其他 pipe、中间件、权限控制、邮件服务、jwt 的 token 令牌支持以及鉴权、任务队列、文件上传文件下载等等

### 一、swagger 文档支持

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

主要是：配置两类 main.ts 和 Controller 文件

### 二、日志支持

1、Nest 附带一个默认的内部日志记录器实现，它在实例化过程中以及在一些不同的情况下使用，比如发生异常等等（例如系统记录）。这由 @nestjs/common 包中的 Logger 类实现。你可以全面控制如下的日志系统的行为：

- 完全禁用日志
- 指定日志系统详细水平（例如，展示错误，警告，调试信息等）
- 覆盖默认日志记录器的时间戳（例如使用 ISO8601 标准作为日期格式）
- 完全覆盖默认日志记录器
- 通过扩展自定义默认日志记录器
- 使用依赖注入来简化编写和测试你的应用
- 你也可以使用内置日志记录器，或者创建你自己的应用来记录你自己应用水平的事件和消息。

更多高级的日志功能，可以使用任何 Node.js 日志包，比如 Winston，来生成一个完全自定义的生产环境水平的日志系统。

2、 要禁用日志，在（可选的）Nest 应用选项对象中向 NestFactory.create() 传递第二个参数设置 logger 属性为 false

```
const app = await NestFactory.create(ApplicationModule, {
  logger: ['error', 'warn'], // false 就是禁用日志
});
await app.listen(3000);
```

3、 支持多种的日志整合：默认日志、自定义日志（MyLogger implements LoggerService）、扩展内置的日志类、中间件实现日志，都是依赖注入的，所以支持扩展。

样例代码是以 中间件 为模式编写的。
