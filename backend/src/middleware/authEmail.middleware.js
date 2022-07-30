const sendEmail = require("../../floatEmail");
const { authCodeModel } = require("../service/user.service");

const authEmail = async (ctx, next) => {
  const { email } = ctx.request.body;
  const authCodeNow = Math.random().toString().substring(2, 8);
  console.log(authCodeNow);
  sendEmail(email, authCodeNow);
  //把当前的authCode存入数据库里面
  const authCode = await authCodeModel.create({
    authCode: authCodeNow,
    email: email,
  });
  ctx.status = 200;
  ctx.body = {
    status: 200,
    message: "Send email successfully!",
    // 前端将token存在localstorage中
    // 注销时，前端删除localstorage中的token
  };
  await next();
};

module.exports = {
  authEmail,
};
