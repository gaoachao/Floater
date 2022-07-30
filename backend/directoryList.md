|-- Floater
    |-- .env								 				 //后端配置文件，端口+JWT的密钥
    |-- .gitignore										
    |-- README.md
    |-- floatEmail.js        			     		  //自已封装的nodemailer函数
    |-- package-lock.json		
    |-- package.json
    |-- src
        |-- app.js										  //入口文件
        |-- app
        |   |-- index.js								  //同一管理koa实例app
        |-- config
        |   |-- config.default.js				   //dotenv包的配置文件
        |-- controller
        |   |-- bottle.controller.js			  //瓶子有关控制器
        |   |-- user.controller.js			     //用户有关控制器
        |-- middleware
        |   |-- auth.middleware.js   		   //Token认证中间件 
        |   |-- authEmail.middleware.js	//发送认证邮件中间件
        |   |-- isUser.middleware.js		   //判断当前用户是否注册中间件
        |   |-- user.middleware.js			  //user有关中间件，包括密码加密加盐和输入合法性判断
        |-- router
        |   |-- bottle.route.js					   //瓶子相关路由
        |   |-- index.js								  //路由器
        |   |-- user.route.js						 //用户相关路由
        |-- service										//service是数据库相关
        |   |-- advice.service.js				  //用户提交的评价与建议数据库
        |   |-- bottle.service.js				   //瓶子相关数据库
        |   |-- user.service.js					  //用户相关数据库（用户信息和验证码）
        |-- upload										//koa-body中设置的前端上传文件至服务器的存放路径
          
