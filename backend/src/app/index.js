const path = require('path');

const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');

//一步导入所有的路由文件，其实/router/index可以简写成/router
const router = require('../router/index');

const app = new Koa();


//在注册所有路由之前注册koaBody
//app.use(KoaBody) 这是最简单的写法
//但是我们要支持文件的上传，所以要修改配置
app.use(
	KoaBody({
	//默认为false
	multipart:true,
	formidable:{
		//文件的存放路径，不推荐使用相对路径，
		//因为options中的相对路径不是相对当前的文件，而是相对process.cwd()
		//因此我们引入path模块，__dirname代表当前文件的绝对路径
		uploadDir:path.join(__dirname,'../upload'),
		//是否保留文件的拓展名
		keepExtensions:true,
	}

}))
app.use(KoaStatic(path.join(__dirname,'../upload')));
//middleware must be a function！
//app.use必须用函数作为参数，才能完成注册,因此调用.routes()方法
app.use(router.routes());

//来判断发出的HTTP请求是否支持，如果不支持则不返回404而是501
app.use(router.allowedMethods());

module.exports = app;