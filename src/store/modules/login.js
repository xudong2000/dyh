import { getStudentsData } from '../../network/login'

const state = {}

const getters = {}

const actions = {
  aGetStudentsData({ commit }) {
    getStudentsData().then((res) => {
      console.log(res)
    })
  },
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
