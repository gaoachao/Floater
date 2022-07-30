const bcrypt = require('bcryptjs');

//输入合法性验证中间件
const userValidator = async (ctx,next) => {
	const {email,password} = ctx.request.body;
	if(!email || !password){
		//此处console.error
		// console.error("email or password is empty!",ctx.request.body);
		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: "email or password is empty!",
			result:'',
		}
		return;
	}
	//如果是合法的就交给下一个中间件去处理
	await next();
	
}

//密码加盐加密中间件
const crpytPassword = async (ctx,next)=>{
	const {password} = ctx.request.body;
	//10是加盐次数
	const salt = bcrypt.genSaltSync(10);
	//hash中保存的是密文
	const hash = bcrypt.hashSync(password,salt);

	ctx.request.body.password = hash;
	await next();
}
	


module.exports = {
	userValidator,
	crpytPassword
}