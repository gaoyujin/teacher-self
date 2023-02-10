## （第一步）框架简介

- Nest 是一个用于构建高效，可扩展的  [Node.js](https://link.juejin.cn?target=http%3A%2F%2Fnodejs.cn%2F 'http://nodejs.cn/')  服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持  [TypeScript](https://link.juejin.cn?target=https%3A%2F%2Fwww.tslang.cn%2F 'https://www.tslang.cn/')（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。
- Nest 框架底层 HTTP 平台默认是基于 Express 实现的，所以无需担心第三方库的缺失。 Nest 旨在成为一个与平台无关的框架。 通过平台，可以创建可重用的逻辑部件，开发人员可以利用这些部件来跨越多种不同类型的应用程序。 nest 目前有两个支持开箱即用的 HTTP 平台：express 和 fastify 可以在项目中直接引入。

人话：nestjs 的核心其实就是一个 IoC 模块管理容器的实现，是符合面向对象的设计思想开发的。（这个框架是根据 Spring 和 Angular 的设计思想开发的）

### 为什么选择 Nest

- 目前市面上有很多 node 框架可供大家选择。
- Express.js 是 Node.JS 诞生之初，是一款基于[Node.js](https://link.juejin.cn?target=http%3A%2F%2Fnodejs.cn%2F 'http://nodejs.cn/')以及 Chrome V8 引擎，快速、极简的 JS 服务端开发框架。
- Koa.js 是一款微型 Web 框架，写一个 hello world 很简单，但 web 应用离不开 session，视图模板，路由，文件上传，日志管理。这些 Koa 都不提供，需要自行去官方的 Middleware 寻找。然而，100 个人可能找出 100 种搭配。
- Egg.js 是基于 Koa.js，解决了上述问题，将社区最佳实践整合进了 Koa.js，另取名叫 Egg.js，并且将多进程启动，开发时的热更新等问题一并解决了。这对开发者很友好，开箱即用，开箱即是最(较)佳配置。Egg.js 发展期间，ECMAScript 又推出了 async await，相比 yield 的语法 async 写起来更直。后面 Koa.js 也同步进行了跟进。
- Midway 是阿里团队，基于渐进式理念研发的 Node.js 框架，结合了 OOP 和函数式两种编程范式。以 egg 是作为底层框架，加上了良好的 TypeScript 的定义支持等众多新特性,推出了 Midway，有兴趣的小伙伴可以去官方文档学习一下
- Nest.js 基于 Express.js 的全功能框架 Nest.js，他是在 Express.js 上封装的，充分利用了 TypeScript 的特性；Nest.js 的优点是社区活跃，涨势喜人，截止目前在 [GitHub](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnestjs%2Fnest 'https://github.com/nestjs/nest') 拥有 `43.7k Star` 是近期比较热门的企业级框架。
- 基于支持底层支持 ts 与企业级和社区活跃度等综合考虑，这里我选择用 nest 来进行学习。各位同学可以按需选择。

上述**面向企业级使用**的框架与 nestjs 相似的是 eggjs，但是设计的核心思想不一样。（后续研究下 eggjs，看看具体的区别）

## （第二步）Nestjs 的基础原理

### 控制反转 依赖注入

- 我们以下面的例子去解读

```
// 工人
class Worker {
  manualProduceScrew(){
    console.log('A screw is built')
  }
}

// 螺丝生产车间
class ScrewWorkshop {
  private worker: Worker = new Worker()

  produce(){
    this.worker.manualProduceScrew()
  }
}

// 工厂
class Factory {
  start(){
    const screwWorkshop = new ScrewWorkshop()
    screwWorkshop.produce()
  }
}

const factory = new Factory()
// 工厂开工啦！！！
factory.start()
```

上面的生产实体是工人，现在要换成机器

```
// 机器
class Machine {
  autoProduceScrew(){
    console.log('A screw is built')
  }
}

class ScrewWorkshop {
  // 改为一个机器实例
  private machine: Machine = new Machine()

  produce(){
    this.machine.autoProduceScrew()
  }
}

class Factory {
  start(){
    const screwWorkshop = new ScrewWorkshop()
    screwWorkshop.produce()
  }
}

const factory = new Factory()
// 工厂开工啦！！！
factory.start()
```

这是作为 ScrewWorkshop 其实就已经发现问题了，我的工人类型变化，我就跟着变，累人啊。

```
// 定义一个生产者接口
interface Producer {
  produceScrew: () => void
}

// 实现了接口的机器
class Machine implements Producer {
  autoProduceScrew(){
    console.log('A screw is built')
  }

  produceScrew(){
    this.autoProduceScrew()
  }
}

// 实现了接口的工人
class Worker implements Producer {
  manualProduceScrew(){
    console.log('A screw is built')
  }

  produceScrew(){
    this.manualProduceScrew()
  }
}

class ScrewWorkshop {
  // 依赖生产者接口,可以随意切换啦！！！
  // private producer: Producer = new Machine()
  private producer: Producer = new Worker()

  produce(){
    this.producer.produceScrew()
  }
}

class Factory {
  start(){
    const screwWorkshop = new ScrewWorkshop()
    screwWorkshop.produce()
  }
}

const factory = new Factory()
// 工厂开工啦！！！
factory.start()
```

上面只是把生产者的行为抽象了，并没有解决 ScrewWorkshop 问题。但现在这步是必须，需要把 ScrewWorkshop 的依赖对象抽象化，从而实现生产者的可扩展。

```
// ......Worker/Machine及其所遵循的接口Producer的实现与此前一致，此处省略

class ScrewWorkshop {
  private producer: Producer

  // 通过构造函数注入
  constructor(producer: Producer){
    this.producer = producer
  }

  produce(){
    this.producer.produceScrew()
  }
}

class Factory {
  start(){
    // 在Factory类中控制producer的实现，控制反转啦！！！
    // const producer: Producer = new Worker()
    const producer: Producer = new Machine()
    // 通过构造函数注入
    const screwWorkshop = new ScrewWorkshop(producer)
    screwWorkshop.produce()
  }
}

const factory = new Factory()
// 工厂开工啦！！！
factory.start()

```

再看这里的代码，是否发现，现在生产者的变化（无论是工作、机器、还是其他），ScrewWorkshop 不在需要修改。这是如下的概念：

- 什么是依赖倒置原则（Dependency Inversion Principle）

高层模块（ScrewWorkshop）不应该依赖底层模块（Worker、Machine），二者都应该依赖抽象（例如接口）。

抽象不应该依赖细节，细节（具体实现）应该依赖抽象。

- 什么是控制反转（Inversion Of Control）

控制反转是一种设计原则。顾名思义，它用于在面向对象设计中反转不同种类的控制以实现松耦合。在这里，控制是指一个类中除了完成其主要工作流程之外的其他所有流程，包括对应用程序流程的控制，以及对依赖对象创建和绑定流程的控制。

- 什么是依赖注入（Dependency Injection）

控制反转只告诉了我们需要怎么去做，但并没有告诉我们应该怎么做。所以实现控制反转的手段多种多样，其中比较流行的也是 Nest、Spring 等主流框架所使用的手段就是依赖注入。
依赖注入允许在类之外创建依赖对象，并通过不同的方式将这些对象提供给类。使用依赖注入的手段，我们能够将类所依赖对象的创建和绑定移动到类自身的实现之外。
不同的方式包括：构造函数注入、属性注入、Setter 方法注入、接口注入。
我不想看概念了，能简单的说一下它们到底做了什么吗？
通俗的说通过控制反转和依赖注入实现了以下功能：
如果类 A 需要类 B，类 A 中并不直接控制创建类 B 的实例。与之相反，我们从类 A 外部控制类 B 实例的创建，类 A 之中只负责使用类 B 的实例，完全无需关心类 B 实例是如何创建的。

### 样例的总结

<image src="./image/类设计.PNG"></image>

1. 我们再来通俗的解释一下（并不是精准的对应，只是为了让读者能够感受到侧重点），在对这个车间的改造过程中我们都做了些什么：

- 依赖倒置： 解除 ScrewWorkshop 与 Worker/Machine 具体类之间的依赖关系，转为全部依赖 Producer 接口；
- 控制反转： 在 Factory 类中实例化 ScrewWorkshop 中需要使用的 producer，ScrewWorkshop 的对依赖项 Worker/Machine 的控制被反转了；
- 依赖注入： ScrewWorkshop 中不关注具体 producer 实例的创建，而是通过构造函数 constructor 注入；

2. 需要明确的是依赖倒置和控制反转都是设计原则，只是一种思想，而依赖注入才是是真正的实现手段。在 Nest 的设计中遵守了控制反转的思想，使用依赖注入（包括构造函数注入、参数注入、Setter 方法注入）解藕了 Controller 与 Provider 之间的依赖。
   最后，我们将 Nest 中的元素与我们自己编写的工厂进行一个类比：

- Provider & Worker/Machine：真正提供具体功能实现的低层类。
- Controller & ScrewWorkshop：调用低层类来为用户提供服务的高层类。
- Nest 框架本身 & Factory：控制反转容器，对高层类和低层类统一管理，控制相关类的新建与注入，解藕了类之间的依赖。

### TS 装饰器与元数据

TS 在编译过程中会去掉原始数据类型相关的信息，将 TS 文件转换为传统的 JS 文件以供 JS 引擎执行。但是，一旦我们引入 reflect-metadata 并使用装饰器语法对一个类或其上的方法、属性、访问器或方法参数进行了装饰，那么 TS 在编译后就会自动为我们所装饰的对象增加一些类型相关的元数据，目前只存在以下三个键：

- 类型元数据使用元数据键"design:type"
- 参数类型元数据使用元数据键"design:paramtypes"
- 返回值类型元数据使用元数据键"design:returntype"

这几个键会根据装饰器类型的不同而被自动添加不同的值。
这里我理解的是实现了类似于 Spring 中的注解功能，以及运行时的类型检测等等。

## （第三步）创建项目

- ```
  $  npm i -g @nestjs/cli
  $  nest new project-name
  复制代码
  ```

- 创建好项目后看一下项目目录,以下是核心文件的简单描述:

- | app.controller.ts      | 带有单个路由的基本控制器示例               |
  | ---------------------- | ------------------------------------------ |
  | app.controller.spec.ts | 对于基本控制器的单元测试样例               |
  | app.module.ts          | 应用程序的根模块。                         |
  | app.service.ts         | 带有单个方法的基本服务                     |
  | main.ts                | 应用程序入口文件。用来创建 Nest 应用实例。 |

  ```
  /* main.ts */
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule); // 使用核心类 NestFactory 返回一个 接口对象
    await app.listen(3000);  // 这里是默认设置的端口号
  }
  bootstrap();
  复制代码
  ```

#### 运行项目

- ```
  $ npm run start:watch // 启动项目并监听代码变动 这里可以在package.json 中进行配置指令
  复制代码
  ```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fab94c9439094c4fbe018f85057593ec~tplv-k3u1fbpfcp-zoom-1.image)

- ```
    我们可以看到服务已经启动,输入本机地址并带上端口号3000,发送一次 get 请求 则会返回 `Hello World`。

    这里是因为在 app.controll.ts 文件中 @Get()HTTP请求装饰器告诉Nest为HTTP请求的特定端点创建处理程序。
  复制代码
  ```

## 模块的基本构成

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a938f20eb4dc48f0a4f7538997a48bd2~tplv-k3u1fbpfcp-watermark.image?)

- 上图是最基本的项目模块的构成：service(providers)、controller(controllers)、module(Module)
- 还有很多其他的元素：dto、entity 等等...
