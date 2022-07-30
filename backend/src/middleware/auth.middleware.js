const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')

const auth = async(ctx,next) => {
	const {authorization} = ctx.request.header;
	const token = authorization.replace('Bearer ','');
	// console.log(token);
	try{
		const user = jwt.verify(token,JWT_SECRET);
		//把user存在ctx.state.user，后续有用
		ctx.state.user = user;
	} catch(err){
		switch(err.name){
			case 'TokenExpiredError':
				ctx.body = {
					status :401,
					errorCode:4011,
					message:"Token is Expired!",
					result:''
				}
				return;
			case 'JsonWebTokenError':
				ctx.body = {
					status :401,
					errorCode:4012,
					message:"Token is Invalid!",
					result:''
				}
		}
	}
	await next();
}

module.exports = {
	auth
}