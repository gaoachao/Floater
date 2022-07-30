//user模块下的vuex store
//引入Vuex
import Vuex from 'vuex'
//引入Vue
import Vue from 'vue'
//Vue.use(Vuex)需要在new Vuex.Store()之前
Vue.use(Vuex)

//state：仓库存储数据的地方
const state = {
	
};
//mutations：修改state的唯一手段
const mutations = {};
//action：处理action，可以处理异步。
const actions = {};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

//创建Store
const store = new Vuex.Store({
	// actions:actions,
	// mutations:mutations,
	// state:state,
	// key 和 value 重名可以触发简写形式
	actions,
	mutations,
	state,
	getters
});

//暴露store
export default store;