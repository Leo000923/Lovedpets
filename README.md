***

### lovedpets

2017301550139-郝翔宇

***

**宠物领养网站**

**领养代替购买**

**交流转让平台**

***
**运行方式**

* **先用node开启后端服务器**

  终端信息：

  server started on 5000
  Mongodb Connected ...

  表示服务器启动完成

* **后在public文件夹中index.html为前端客户端**

* *注意事项：mongoDB数据库连接较慢（服务器在国外），点击登录或注册后请耐心等待弹出信息（console.log信息 & alert窗口信息）*

***
* **api/users/test**
  

@route GET api/users/test

@desc 测试接口地址

@access 接口是公开的

* **api/users/register**
  

@route POST api/users/register

@desc 注册接口地址 向mongoDB中注入数据

@access 接口是公开的

* **api/users/login**
  

@route POST api/users/login

@desc 登录接口地址 返回token

@access 接口是公开的

* **api/users/current**
  

@route GET api/users/current

@desc 用户信息接口地址接口地址 返回用户信息

@access 接口是私密的

***

**验证设置 & 配置信息**

修改信息在validation文件夹中

config/keys.js 中为mongoDB链接

package.json 中为本实验用到的包信息

***