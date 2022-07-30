//引入Vuex
import Vuex from 'vuex'
//引入Vue
import Vue from 'vue'
//Vue.use(Vuex)需要在new Vuex.Store()之前
Vue.use(Vuex)

import user from './user'

const store = new Vuex.Store({
	modules:{
		user,
	}
});

//暴露store
export default store;