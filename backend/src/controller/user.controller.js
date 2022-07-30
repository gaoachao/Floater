const { userModel, authCodeModel} = require("../service/user.service");
const { adviceModel } = require("../service/advice.service");
const { JWT_SECRET } = require("../config/config.default");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//UserController里面的有点像中间件但是不提供复用功能，所以又有些不同
class UserController {
  //注册
  async register(ctx, next) {
    //request.body获取请求体

    //1.获取数据
    const { email, password, authCode } = ctx.request.body;
    //1.1验证合法性，检验是否为空，在 user.middleware.js 中已经写了中间件，然后在user.route.js中使用
    if (!authCode) {
      ctx.status = 422;
      ctx.body = {
        status: 422,
        message: "Auth Code can't be empty!",
        result: "",
      };
      return;
    }
    //1.2验证合理性，是否已经注册
    const hasUser = await userModel.findOne({ email: email });
    if (hasUser) {
      // console.error("This user has already registerd!",ctx.request.body);
      ctx.status = 422;
      ctx.body = {
        status: 422,
        message: "This user has already registerd!",
        result: "",
      };
      return;
    }
		//不能使用findOne，因为它是找到最早一条记录
    const authUser = await authCodeModel.find({email: email}).sort({_id:-1}).limit(1);
    //HUST邮箱验证码
    if (!authUser) {
      ctx.status = 422;
      ctx.body = {
        status: 422,
        number: 423,
        message: "Auth code doesn't send!",
        result: "",
      };
      return;
    }
    if (!(authCode === authUser[0].authCode)) {
      ctx.status = 422;
      ctx.body = {
        status: 422,
        message: "Auth code is wrong!",
        result: "",
      };
      return;
    }

    //2.操作数据库，数据库操作放在service层
    const user = await userModel.create({
      email: email,
      password: password,
    });

    //3.返回结果
    ctx.body = {
      user,
      status: 200,
      msg: "Register successfully!",
    };
  }
  //登录
  async login(ctx, next) {
    const { email, password } = ctx.request.body;
    const user = await userModel.findOne({ email: email });
    // console.log(user);
    if (!user) {
      ctx.status = 422;
      ctx.body = {
        number: 423,
        status: 422,
        message: "This user is not registerd!",
        result: "",
      };
      return;
    }
    //比对输入密码和加盐后的密码
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          studentID: user.email,
        },
        JWT_SECRET,
        {
          //token过期时间
          expiresIn: "2d",
        }
      );
      ctx.status = 200;
      ctx.body = {
        status: 200,
        message: "Log in successfully!",
        user,
        token,
        // 前端将token存在localstorage中
        // 注销时，前端删除localstorage中的token
      };
    } else {
      ctx.status = 422;
      ctx.body = {
        status: 422,
        message: "Password is wrong!",
        result: "",
      };
      return;
    }
  }
  //新旧密码对比，这一步需要写在crpytPassword
  async passwordCompare(ctx, next) {
    const _id = ctx.state.user.id;
    const { password,oldPassword}= ctx.request.body;
    const user = await userModel.findOne({ _id: _id });
		if (!bcrypt.compareSync(oldPassword, user.password)) {
			ctx.status = 422;
      ctx.body = {
        status: 422,
				errorCode:10301,
        message: "Old password is wrong",
        result: "",
      };
      return;
    };
    if (bcrypt.compareSync(password, user.password)) {
			ctx.status = 422;
      ctx.body = {
        status: 422,
				errorCode:10302,
        message: "New password is the same as the old one",
        result: "",
      };
      return;
    };
    await next();
  }

  //修改密码(使用token)
  async changePassword(ctx, next) {
    //步骤：获得数据 操作数据库 返回结果
    const _id = ctx.state.user.id;
    //用户输入的新密码
    const password = ctx.request.body.password;
    //通过id来从数据库找到用户
    const user = await userModel.findOne({ _id: _id });
    // console.log(user);

    //更新数据库中的密码

    await userModel
      .updateOne({ _id: _id }, { password: password })
      .then((result) => {
        console.log(result);
      });
    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "Password was changed successfully!",
      user,
    };
    // 这里遇到一个小问题，bcrypt加密过的密码不能来做新旧密码的对比，
    // 因此我又写了一个中间件passwordCompare放在crpytPassword之前
    // 状态是未抽离中间件，如果下次需要复用我再抽离
    // if (bcrypt.compareSync(password, user.password)) {}
    // else{
    // 	ctx.status = 422;
    //   ctx.body = {
    //     status: 422,
    //     message: "New password is the same as the old one",
    //     result: ""
    //   };
    // }
  }

  //忘记密码下的修改密码(使用邮箱认证)
  async forgetPassword(ctx, next) {
    //用户输入的新密码
    const { password, email, authCode } = ctx.request.body;
    const user = await userModel.findOne({ email: email });
 
		//不能使用findOne，因为它是找到最早一条记录
    const authUser = await authCodeModel.find({email: email}).sort({_id:-1}).limit(1);
		// console.log(authUser[0].authCode);


    //HUST邮箱验证码
    if (!authUser) {
      ctx.status = 422;
      ctx.body = {
        status: 422,
        errorCode:10001,
        message: "Auth code doesn't send!",
        result: "",
      };
      return;
    }
		//这里必须使用authUser[0].authCode  因为find返回的是一个数组里面有若干个对象，findOne返回的直接是一个对象
    if (!(authCode === authUser[0].authCode)) {
      ctx.status = 422;
      ctx.body = {
        status: 422,
				errorCode:10002,
        message: "Auth code is wrong!",
        result: "",
      };
      return;
    }

    await userModel
      .updateOne({ email: email }, { password: password })
      .then((result) => {
        console.log(result);
      });
    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "Password was changed successfully!",
      user,
    };
  }

	//个人中心的评价及建议
	async advice(ctx,next){
		const {  email, comment,advice } = ctx.request.body;
		const nowAdvice = await adviceModel.create({
      email: email,
      comment: comment,
			advice:advice
    });
		ctx.body = {
			status:200,
			message:'Send sucessfully',
			nowAdvice
		}
	}

}

module.exports = new UserController();
