//对API进行同一管理
import requests from './request'

//1.用户模块
//获取验证码
//URL:/user/emailAuth  method:post
export const reqGetCode = (data)=>requests({url:'/user/emailAuth',data,method:'POST'});

//注册
//URL:/user/register  method:post
export const reqUserRegister = (data)=>requests({url:'/user/register',data,method:'POST'});

//登录
//URL:/user/login  method:post
export const reqUserLogin = (data)=>requests({url:'/user/login',data,method:'POST'});

//忘记密码相关
export const reqForgetGetCode = (data)=>requests({url:'/user/forgetEmailAuth',data,method:'POST'});
export const reqForgetPassword = (data)=>requests({url:'/user/forgetPassword',data,method:'POST'});

//2.漂流瓶模块
//throw瓶子，因为涉及到upload
export const reqThrowBottle = (data,headers)=>requests({url:'/bottle/upload',data,headers,method:'POST'});

//pick up瓶子
export const reqPickupBottle = (params,headers)=>requests({url:'/bottle/pickup',params,headers,methods:'GET'});

//museum 得到所有在博物馆中的瓶子
export const reqMuseumBottle = (headers) => requests({url:'/bottle/museum',headers,method:'GET'});

//3.个人中心模块
//修改密码
export const changePassword = (data,headers) => requests({url:'/user/changePassword',headers,data,method:'PATCH'});

//我的瓶子
export const reqMyBottle = (params,headers) => requests({url:'bottle/myBottle',params,headers,method:'GET'});

//用户评价与建议
export const sendAdvice = (data,headers) => requests({url:'/user/advice',data,headers,method:'POST'});