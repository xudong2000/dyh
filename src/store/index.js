import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import email from './modules/email'
import student from './modules/student'
import teacher from './modules/teacher'
import team from './modules/class'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    email,
    student,
    teacher,
    team,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
