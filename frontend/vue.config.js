const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	//关闭语法检查
	lintOnSave:false, 
	// 开启代理服务器
	devServer:{
		proxy:'http://localhost:8000'
	}

	// devServer:{
	// 	//这样写的优势：克服了目标服务器单一的问题和
	// 	//自己端口文件存在影响用代理服务器获取目标服务器文件的错误
	// 	proxy:{
	// 		'/api':{
	// 			//后端服务器
	// 			target:'http://localhost:8000',
	// 			//去掉/api
	// 			pathRewrite:{'^/api':''},
	// 			// 两个默认值均为true
	// 			// ws:true, //用于支持websocket
	// 			// changeOrigin:true, //用于控制请求头中的host值
	// 		},
	// 	}
	// }
})
