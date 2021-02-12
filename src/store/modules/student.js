import { getStudentsData, deleStudentsByName } from '../../network/student'

const state = {
  // 保存所有学生数据
  studentsData: [],
  // 保存所有已被删除的学生数据
  removeStuData: [],
  // 保存未完善资料的学生数量
  undoneNum: 0,
  // 学生总数
  stuTotal: 0,
}

const getters = {}

const actions = {
  aGetStudentsData({ state, commit }) {
    getStudentsData().then(
      (res) => {
        state.stuTotal = res.data.data[res.data.data.length - 1].s_id + 1
        commit('mGetStudentsData', res.data.data)
      },
      (err) => {
        console.log('获取数据失败' + err)
      }
    )
  },

  aDeleStudentsByName({ commit }, uname) {
    deleStudentsByName(uname).then(
      (res) => {
        // console.log(res)
      },
      (err) => {
        console.log('删除数据失败' + err)
      }
    )
  },
}

const mutations = {
  mGetStudentsData(state, data) {
    state.studentsData = []
    state.removeStuData = []
    state.undoneNum = 0

    for (let i of data) {
      if (i.isDelete === false) {
        state.studentsData.push(i)
      } else {
        state.removeStuData.push(i)
      }
    }

    for (let i of state.studentsData) {
      // 将字符串转换成日期类型
      var date = new Date(Date.parse(i.startTime))
      //月
      var month = date.getMonth()
      month = month + 1
      if (month < 10) {
        month = '0' + month
      }
      //日
      var riqi = date.getDate()
      if (riqi < 10) {
        riqi = '0' + riqi
      }
      //时间的格式为：2018-01-01
      var time = date.getFullYear() + '-' + month + '-' + riqi
      // 将每个日期字符串替换成日期类型
      i.startTime = time
      if (i.startTime === '2000-01-01') {
        state.undoneNum++
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
