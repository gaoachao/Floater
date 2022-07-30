const fs = require('fs');

const Router = require('koa-router');
const router = new Router();


//这个文件的目的是管理router目录下的所有路由，
//不需要在app目录下的index.js中一遍又一遍的注册路由
fs.readdirSync(__dirname).forEach(file =>{
	// console.log(file);
	if(file !== 'index.js'){
		let r = require('./' + file);
		router.use(r.routes());
	}
})

module.exports = router;