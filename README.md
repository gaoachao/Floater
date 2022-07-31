# Floater			

## 介绍

这是一款略显粗糙的产品，基于“漂流瓶”的idea，花了一周糊出来的，细节处理不够到位，UI不够精美，功能不够完善。但是也算是Bitter-Gourd的第一个正式的项目，所以想纪念一下。

在开发的过程中想尝试实现邮箱认证的功能，于是基于`npm`包`nodemailer`实现了HUST校园邮箱认证，关于校园邮箱的认证仅在前端对输入的邮箱格式的校验，去掉该校验即可支持所有邮箱格式。

一开始的idea是想实现分享图片、音频和视频，但是在UI布局上遇到一些小困难，于是只支持上传图片，事实上由于HTML5的`input[type=file]`标签，三者在前后端交互上本质相同，区别仅在于前端处理。

## 展示

<div>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/1.png" width=30%>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/2.png" width=30%>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/3.png" width=30%>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/4.png" width=30%>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/5.png" width=30%>
    <img src="https://github.com/gaoachao/Floater/raw/main/assets/6.png" width=30%>
</div>



## 开发者

### 前端

```
//默认端口为8080
cd frontend
npm i
npm run serve
```

### 后端

```
//默认端口为8000
cd backend
npm i
npm run dev
```

**注**：

- 后端需要安装`mongodb`数据库，且数据库默认端口为27017。

- 如果开发环境是`arch linux`可以执行`yay -S mongodb-bin`进行安装，以及`yay -S mongodb-compass`安装可视化工具。

## 技术栈

- **frontend** : Vue2 + vuex + axios + Scss
- **backend** : Koa2 + MongoDB

## 项目目录

### 后端目录

```
|-- Floater
    |-- .env                                        //后端配置文件，端口+JWT的密钥
    |-- .gitignore										
    |-- README.md
    |-- floatEmail.js                               //自已封装的nodemailer函数
    |-- package-lock.json		
    |-- package.json
    |-- src
        |-- app.js                                  //入口文件
        |-- app
        |   |-- index.js                            //同一管理koa实例app
        |-- config
        |   |-- config.default.js                   //dotenv包的配置文件
        |-- controller
        |   |-- bottle.controller.js                //瓶子有关控制器
        |   |-- user.controller.js                  //用户有关控制器
        |-- middleware
        |   |-- auth.middleware.js                  //Token认证中间件 
        |   |-- authEmail.middleware.js             //发送认证邮件中间件
        |   |-- isUser.middleware.js                //判断当前用户是否注册中间件
        |   |-- user.middleware.js                  //包括密码加密加盐和输入合法性判断
        |-- router
        |   |-- bottle.route.js                     //瓶子相关路由
        |   |-- index.js                            //路由器
        |   |-- user.route.js                       //用户相关路由
        |-- service                                 //service是数据库相关
        |   |-- advice.service.js                   //用户提交的评价与建议数据库
        |   |-- bottle.service.js                   //瓶子相关数据库
        |   |-- user.service.js                     //用户相关数据库（用户信息和验证码）
        |-- upload                                  //前端上传文件至服务器的存放路径
```

### 前端目录

```
|-- Floater
    |-- .gitignore
    |-- README.md
    |-- babel.config.js
    |-- jsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- vue.config.js                               //配置文件，代理服务器
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- api                                     //网络请求相关
        |   |-- index.js                            //请求集中管理
        |   |-- request.js                          //axios的二次封装
        |-- assets
        |   |-- font
        |   |   |-- Montserrat-Light.otf
        |   |-- image
        |       |-- beach.jpg
        |       |-- entrance.png
        |-- components	
        |-- pages                                   //路由组件
        |   |-- Beach                               //扔瓶子和捡瓶子的路由
        |   |   |-- Beach.vue
        |   |   |-- Pickup.vue
        |   |   |-- Throw.vue
        |   |-- Entrance                            //欢迎界面的路由
        |   |   |-- Entrance.vue
        |   |-- Forget                              //忘记密码界面的路由 
        |   |   |-- Forget.vue
        |   |-- Login                               //登录界面的路由
        |   |   |-- Login.vue
        |   |-- Museum                              //漂流瓶博物馆界面的路由
        |   |   |-- Museum.vue
        |   |-- Register                            //注册界面的路由 
        |   |   |-- Register.vue
        |   |-- UserInfo                            //个人中心相关的路由
        |       |-- Advice.vue                      //评价与建议
        |       |-- Change.vue                      //修改密码
        |       |-- MyBottle.vue                    //我的漂流瓶
        |       |-- MyEmail.vue                     //我的邮箱及隐私承诺
        |       |-- UserInfo.vue                    //个人中心界面
        |-- router
        |   |-- index.js
        |-- store                                   //项目不大，基本没用到的vuex
            |-- index.js	
            |-- user.js
            |-- vux模板.js
```

## 功能

### 用户模块

- **注册**
  - HUST邮箱输入格式校验（为空、格式不符合要求等）。
  - HUST邮箱验证码验证（使用npm包`nodemailer`）。
  - 密码加盐加密（使用npm包`bcryptjs`）。
  - 注册成功后3s跳转至登录界面。
- **登录**
  - 颁发`token`（使用npm包`jsonwebtoken`）。
  - 将`token`存入`localStorage`和`vuex`。
- **忘记密码**
  - HUST邮箱输入格式校验（为空、格式不符合要求等）。
  - HUST邮箱验证码验证（使用npm包`nodemailer`）。
  - 新密码加盐加密（使用npm包`bcryptjs`）。
  - 修改新密码成功后3s跳转至登录界面。

### 漂流瓶模块

- **扔漂流瓶**
  - 支持上传图片，且限定格式为`jpeg`和`png`。（`koa-body`支持文件上传）
  - 支持选择图片并显示图片名称和图片加载。
  - 每个瓶子在数据库中存有扔出者的邮箱信息和传入后台服务器的图片名称，以便于前端直接拼接`url`访问图片资源。（`koa-static`支持访问后台静态资源）
- **捡漂流瓶**
  - `get`请求携带用户邮箱信息的`params`，以便在捡瓶子的时候筛选出自己的瓶子。
  - 不允许用户在捡瓶子的时候捡到自己瓶子。

### 漂流瓶博物馆模块

- **展示瓶子**
  - 抓取数据`isMuseum:true`，并且渲染在页面上。

### 个人中心模块

- **退出登录**
  - 退出登录时删除`localStorage`中的`token`和当前登录用户的邮箱。
  - 退出登录前会有提示性交互。
- **修改密码**
  - 需要输入旧密码和新密码，如果旧密码错误或者新密码和旧密码相同则无法修改。
- **我的漂流瓶**
  - 查看当前用户所扔的漂流瓶的历史记录。
- **我的邮箱**
  - 查看当前用户绑定的邮箱。
  - 产品隐私保证。
- **评价及建议**
  - 支持评价和建议两者其一为空，但不支持两者均为空。
