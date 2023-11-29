# ModelEval

ModelEval是一个用于评估模型的代码仓库。

## Usage

按照以下步骤在本地机器上安装和运行该项目。

### 安装

按照以下步骤安装ModelEval：

1. 克隆仓库：

   ```
   git clone https://github.com/JimmyyyChen/modeleval.git
   cd modeleval
   ```

2. 安装所需的node模块：

   ```
   npm install
   ```

### 数据库设置

ModelEval需要一个MySQL数据库。执行以下步骤来设置：

1. 登录MySQL：

   ```
   mysql -u <username> -p
   ```

   将`<username>`替换为您的MySQL用户名，并在提示时输入密码。

2. 创建`modeleval`数据库：

   ```
   CREATE DATABASE modeleval;
   quit
   ```

### 配置

1. 创建一个`.env`文件来存储数据库凭证：

   ```
   touch .env
   echo 'DATABASE_URL="mysql://<username>:<password>@localhost:3306/modeleval"' > .env
   ```

   将`<username>`和`<password>`替换为您的MySQL凭证。

### 数据库迁移

运行Prisma迁移来设置数据库架构：

```
npx prisma migrate dev
```

### 运行应用程序

使用以下命令运行ModelEval：

```
npm run dev
```

现在，应用程序应该在您的本地开发服务器上运行，访问地址为[http://localhost:3000](http://localhost:3000)。

## API

我们的项目的 API 文档可以在 [api.md](docs/api.md) 文件中找到。这份文档提供了关于所有 API 端点的详细信息，包括请求格式、响应结构、示例请求和响应，以及其他相关信息。
