//对axios的二次封装
import axios from "axios"

//1.利用axios.create创建一个axios实例

//请求拦截器
const requests = axios.create({
	withCredentials: true,
	baseURL:"http://localhost:8080",
	timeout:10000,
});

requests.interceptors.request.use((config) =>{
	//请求成功的回调
	return config;
},(error)=>{
	//请求失败的回调函数
	return Promise.reject(error);
});

//响应拦截器
requests.interceptors.response.use((res)=>{
	//响应成功的回调函数
	return res.data;
},(error)=>{
	//响应失败的回调函数
	return Promise.reject(error);
});

export default requests;