const { userModel } = require("../service/user.service");

const userExist = async function(ctx,next){
	const { email } = ctx.request.body;
	const hasUser = await userModel.findOne({ email: email });
  if (hasUser) {
    ctx.status = 422;
    ctx.body = {
      status: 422,
      message: "This user has already registered!",
      result: "",
    };
    return;
  }
	await next();
}

const userNotExist = async function(ctx,next){
	const { email } = ctx.request.body;
	const hasUser = await userModel.findOne({ email: email });
  if (!hasUser) {
    ctx.status = 422;
    ctx.body = {
      status: 422,
      message: "This User does not register!",
      result: "",
    };
    return;
  }
	await next();
}

module.exports = {
	userExist,
	userNotExist
}