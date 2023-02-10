## （第一步）Nestjs 项目的基本组成

- Nest 的项目基本组成有：控制器（controller）、提供者（provider)、模块（Module）组成。

### 控制器（controller）

控制器负责处理传入的请求和向客户端返回响应。

<image src='./image/controller.PNG'></image>

控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

为了创建一个基本的控制器，我们使用类和装饰器。装饰器将类与所需的元数据相关联，并使 Nest 能够创建路由映射（将请求绑定到相应的控制器）。

### 提供者（provider)

看官网

### 模块（Module）

看官网

## （第二步）实操创建模块

- 全局安安装：npm i -g @nestjs/cli，然后 nest --help，看到如下命令说明:

<image src='./image/nest-cli.PNG'></image>

- 使用命令创建相关文件 ==> controller: nest g co {fileName} 、 provider: nest g s {fileName} 、 Module: nest g mo {fileName}

## （第三步）运行结果

npm run start
