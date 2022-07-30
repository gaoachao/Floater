const path = require("path");

const { bottleModel } = require("../service/bottle.service");

class BottleController {
  //扔出瓶子
  async upload(ctx, next) {
    const { bottleType, isMuseum, content, isImage, imageName, email } =
      ctx.request.body;
    //如果没有图片
    if (isImage === "false") {
      const bottle = await bottleModel.create({
        bottleType: bottleType,
        isMuseum: isMuseum,
        content: content,
        isImage: isImage,
        imageName: imageName,
        email: email,
        path: "null",
      });
      ctx.body = {
        bottle,
        status: 200,
        msg: "Throw successfully!",
      };
      //如果有图片
    } else if (isImage === "true") {
      const { file } = ctx.request.files;
      //其实在前端检查就ok了，input[file]可以限制上传文件的格式的
      const fileType = ["image/jpeg", "image/png"];
      if (file) {
        if (fileType.includes(file.mimetype)) {
          const bottle = await bottleModel.create({
            bottleType: bottleType,
            isMuseum: isMuseum,
            content: content,
            isImage: isImage,
            imageName: imageName,
            email: email,
            path: path.basename(file.filepath),
          });
          ctx.body = {
            status: 200,
            msg: "Throw successfully!",
            bottle,
            result: {
              photo: path.basename(file.filepath),
            },
          };
        } else {
          ctx.body = {
            status: 422,
            errorCode: 20001,
            message: "Image format not supported",
          };
        }
      } else {
        ctx.body = {
          status: 422,
          errorCode: 20002,
          message: "Upload image failed",
          result: "",
        };
      }
    } else {
      ctx.body = {
        status: 422,
        errorCode: 20003,
        message: "isImage is not true or false",
        result: "",
      };
    }
  }

  //捡瓶子
  async pickup(ctx, next) {
    const { email } = ctx.request.query;
    //数据库操作需要用await
    //先查该用户有几个瓶子
    const number = await bottleModel.find({ email: email });
    //随机获得某个瓶子
    const bottles = await bottleModel.aggregate([
      {
        //需要随机找number.length + 1 个瓶子，
        $sample: { size: number.length + 1 },
      },
      {
        //除去自己的瓶子
        $match: { email: { $ne: email } },
      },
    ]);
    //然后取出一堆随机瓶子中的第一个返回结果
    const bottle = bottles[0];
    if (!bottle) {
      ctx.body = {
        status: 422,
        msg: "There are no bottles in the sea!",
        bottle,
      };
    } else {
      ctx.body = {
        status: 200,
        msg: "Pick up successfully!",
        bottle,
      };
    }
  }

  //漂流瓶博物馆
  async museum(ctx, next) {
    const bottles = await bottleModel.find({ isMuseum: "true" });
    const number = bottles.length;
    ctx.body = {
      status: 200,
			number,
      msg: "Pick up successfully!",
      bottles,
    };
  }

	//展示该用户的所有瓶子
	async myBottle(ctx,next){
		const { email } = ctx.request.query;
		const bottles = await bottleModel.find({ email: email });
		const number = bottles.length;
		ctx.body = {
      status: 200,
			number,
      msg: "Pick up successfully!",
      bottles,
    };
	}
}

module.exports = new BottleController();
