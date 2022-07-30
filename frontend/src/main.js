import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueRouter);


new Vue({
  render: h => h(App),
	//组件身上都会有$route,$router属性
	router:router,
	//组件身上都会有$store属性
	store:store
}).$mount('#app')
