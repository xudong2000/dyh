import {
  getClassData,
  addStudentByClass,
  deleStudentByClass,
} from '../../network/class'

const state = {
  // 保存所有班级数据
  allClassData: [],
  // 保存所有班级号
  allClassName: [],
}

const getters = {}

const actions = {
  // 获取所有班级数据
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

  // 根据班级号添加学生
  aAddStudentByClass({ commit }, data) {
    addStudentByClass(data).then(
      (res) => {
        // console.log(res)
      },
      (err) => {
        console.log('数据插入失败' + err)
      }
    )
  },

  // 根据班级号删除学生
  aDeleStudentByClass({ commit }, data) {
    deleStudentByClass(data).then(
      (res) => {
        // console.log(res)
      },
      (err) => {
        console.log('数据删除失败' + err)
      }
    )
  },
}

const mutations = {
  // 获取所有班级数据
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
