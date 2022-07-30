# Floater			

## 介绍



## 开发者

### 前端

```
//默认端口为8080
cd frontend
npm i
npm run serve
```

## 后端

```
//默认端口为8000
cd backend
npm i
npm run dev
```

## 技术栈

- **frontend** : Vue2 + Vux + axios + Scss
- **backend** : Koa2 + MongoDB

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

- **修改密码**
  - 需要输入旧密码和新密码，如果旧密码错误或者新密码和旧密码相同则无法修改。
- **我的漂流瓶**
  - 查看当前用户所扔的漂流瓶的历史记录
- **我的邮箱**
  - 查看当前用户绑定的邮箱
- **评价及建议**
  - 支持评价和建议两者其一为空，但不支持两者均为空。
