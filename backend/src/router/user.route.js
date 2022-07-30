const Router = require('koa-router')
//获取中间件
const {
	userValidator,
	crpytPassword,
} = require("../middleware/user.middleware");
const {
	auth
} = require("../middleware/auth.middleware");
const {
	authEmail,
} = require("../middleware/authEmail.middleware");
const {
	userExist,
	userNotExist
} = require("../middleware/isUser.middleware")
//获取路由
const {
	register,
	login,
	passwordCompare,
	changePassword,
	forgetPassword,
	advice
} = require('../controller/user.controller')

// 放上前缀，将来所有的路由就是 /users/xxx
const router = new Router({prefix: '/user'})


// 注册接口
router.post('/register',userValidator,crpytPassword,register);

// 登录接口
router.post('/login',userValidator,login)

// 修改密码接口
router.patch('/changePassword',auth,passwordCompare,crpytPassword,changePassword);

// 发送HUST邮件认证接口(注册)
router.post('/emailAuth',userExist,authEmail);

// 发送HUST邮件认证接口(忘记密码)
router.post('/forgetEmailAuth',userNotExist,authEmail);

// 忘记密码接口
router.post('/forgetPassword',crpytPassword,forgetPassword);

// 用户评价及建议接口
router.post('/advice',auth,advice);

module.exports = router;