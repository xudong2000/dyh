import { getTeachersData } from '../../network/teacher'

const state = {
  // 保存所有老师数据
  teachersData: [],
  // 保存所有老师姓名
  teachersName: [],
}

const getters = {}

const actions = {
  aGetTeachersData({ commit }) {
    getTeachersData().then(
      (res) => {
        commit('mGetTeachersData', res.data.data)
      },
      (err) => {
        console.log('获取数据失败' + err)
      }
    )
  },
}

const mutations = {
  mGetTeachersData(state, data) {
    state.teachersData = data
    state.teachersName = []

    for (let i of data) {
      let obj = {}
      obj.value = i.name
      obj.label = i.name
      state.teachersName.push(obj)
    }
    // console.log(state.teachersName)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
