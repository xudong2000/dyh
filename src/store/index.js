import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import student from './modules/student'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    student,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
