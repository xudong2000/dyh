import { getClassData } from '../../network/class'

const state = {
  // 保存所有班级数据
  allClassData: [],
  // 保存所有班级号
  allClassName: [],
}

const getters = {}

const actions = {
  aGetClassData({ commit }) {
    getClassData().then(
      (res) => {
        commit('mGetClassData', res.data.data)
      },
      (err) => {
        console.log('获取数据失败' + err)
      }
    )
  },
}

const mutations = {
  mGetClassData(state, data) {
    state.allClassData = data
    state.allClassName = []

    for (let i of data) {
      let obj = {}
      obj.value = i.c_id + '班'
      obj.label = i.c_id + '班'
      state.allClassName.push(obj)
    }
    // console.log(state.allClassName)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
