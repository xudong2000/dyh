import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
