import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    role:0,
  },
  getters: {
  },
  mutations: {
    initUser(state,data){
      state.token=data.token;
      state.role=data.role;
    }
  },
  actions: {
  },
  modules: {
  }
})
