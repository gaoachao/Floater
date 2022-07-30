//user模块下的vuex store
const state = {
	Authorization:''   
};
const actions = {
	changeLogin(context,value){
		context.commit('ChangeLogin',value);
	}
};
const mutations = {
  ChangeLogin(state, value) {
    state.Authorization = value;
  },
};
const getters = {};
const userStore = {
	namespaced:true,
  actions,
  mutations,
  state,
  getters,
};

export default userStore;
