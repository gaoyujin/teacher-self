## （第一步）选择 nestjs 的原因列举几个

框架自带支持：TS、RESTful API、模块化、工程化，集成了几乎所有常规开发中使用的功能，列举以下几个继承内容：
（目前前端开发比较提倡使用 TS，所有前端的大型项目基本使用的是：Midway（以 egg.js 为底层框架） 和 nestjs ，从 star 的增长速度就可以窥见一二。)

- swagger 文档支持
- 日志支持
- 错误处理支持
- config 配置
- 数据库集成
- 还有其他 监控、jwt 的 token 令牌支持以及鉴权、pipe、中间件、权限控制、邮件服务、jwt 的 token 令牌支持以及鉴权、任务队列、文件上传文件下载等等

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

### 三、错误处理支持

1、Nest 内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应：

<image src='./image/filterEx.PNG'></image>

开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理类型 HttpException（及其子类）的异常。每个发生的异常都由全局异常过滤器处理, 当这个异常无法被识别时 (既不是 HttpException 也不是继承的类 HttpException ) , 用户将收到以下 JSON 响应:

```
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

2、异常过滤器

虽然基本（内置）异常过滤器可以为您自动处理许多情况，但有时您可能希望对异常层拥有完全控制权，例如，您可能希望基于某些动态因素添加日志记录或使用不同的 JSON 模式。 异常过滤器正是为此目的而设计的。 它们使您可以控制精确的控制流以及将响应的内容发送回客户端。

让我们创建一个异常过滤器，它负责捕获作为 HttpException 类实例的异常，并为它们设置自定义响应逻辑。为此，我们需要访问底层平台 Request 和 Response。我们将访问 Request 对象，以便提取原始 url 并将其包含在日志信息中。我们将使用 Response.json()方法，使用 Response 对象直接控制发送的响应。

@Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest 这个特定的过滤器正在寻找 HttpException 而不是其他的。在实践中，@Catch() 可以传递多个参数，所以你可以通过逗号分隔来为多个类型的异常设置过滤器。

访问路径：http://localhost:3000/exception?id11={参数内容} ，则可以看到自定义的异常内容。

### 四、配置

- 应用程序通常在不同的环境中运行。根据环境的不同，应该使用不同的配置设置。例如，通常本地环境依赖于特定的数据库凭据，仅对本地 DB 实例有效。生产环境将使用一组单独的 DB 凭据。由于配置变量会更改，所以最佳实践是将配置变量存储在环境中。

- 首先，您必须安装所需的包：

```
npm i --save @nestjs/config
```

- 先进行数据库配置，然后看具体的实现

- 完成数据库配置后，继续配置的修改

```
npm i --save @nestjs/config
```

### 五、数据库集成

- Nest 与数据库无关，允许您轻松地与任何 SQL 或 NoSQL 数据库集成。根据您的偏好，您有许多可用的选项。一般来说，将 Nest 连接到数据库只需为数据库加载一个适当的 Node.js 驱动程序，就像使用 Express 或 Fastify 一样。
- 您还可以直接使用任何通用的 Node.js 数据库集成库或 ORM ，例如 Sequelize (recipe)和 TypeORM ，以在更高的抽象级别上进行操作。

- TypeORM 集成：

```
npm install --save @nestjs/typeorm typeorm mysql2
```

- 数据库服务器安装好相关的 SQL，通过以下配置，完成数据库的配置信息：

```
import { join } from 'path';
export default {
  type: 'mysql',
  host: 'localhost',
  //socketPath: '/tmp/mysql.sock',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true, // 设置 synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
};

```

具体的配置说明：https://typeorm.io/data-source-options

- 配置数据库的实现

官网地址：https://docs.nestjs.cn/9/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
