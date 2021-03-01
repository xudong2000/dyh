import { getTeachersData, deleTeacherByName } from '../../network/teacher'

const state = {
  // 保存所有老师数据
  teachersData: [],
  // 保存所有老师姓名
  teachersName: [],
  // 保存所有已被删除的老师数据
  removeTeacData: [],
  // 保存未完善资料的老师数量
  undoneNum: 0,
  // 老师总数
  teacTotal: 0,
}

const getters = {}

const actions = {
  // 获取所有老师数据
  aGetTeachersData({ state, commit }) {
    getTeachersData().then(
      (res) => {
        state.teacTotal = res.data.data[res.data.data.length - 1].t_id + 1
        commit('mGetTeachersData', res.data.data)
      },
      (err) => {
        console.log('获取数据失败' + err)
      }
    )
  },

  // 通过姓名删除指定老师
  aDeleTeacherByName({ commit }, uname) {
    deleTeacherByName(uname).then(
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
  // 获取所有老师数据
  mGetTeachersData(state, data) {
    state.teachersData = []
    state.removeTeacData = []
    state.teachersName = []
    state.undoneNum = 0

    // 判断老师是否已被删除
    for (let i of data) {
      if (i.isDelete === false) {
        // i.hometown = i.hometown.join('-')
        state.teachersData.push(i)
      } else {
        state.removeTeacData.push(i)
      }
    }

    // 将所有老师姓名保存到新的对象中
    for (let i of data) {
      let obj = {}
      obj.value = i.name
      obj.label = i.name
      state.teachersName.push(obj)
    }

    // 将所有日期类型转换成年月
    for (let i of state.teachersData) {
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

      // 将字符串转换成日期类型
      var date1 = new Date(Date.parse(i.birthday))
      //月
      var month1 = date1.getMonth()
      month1 = month1 + 1
      if (month1 < 10) {
        month1 = '0' + month1
      }
      //日
      var riqi1 = date1.getDate()
      if (riqi1 < 10) {
        riqi1 = '0' + riqi1
      }
      //时间的格式为：2018-01-01
      var time1 = date1.getFullYear() + '-' + month1 + '-' + riqi1
      // 将每个日期字符串替换成日期类型
      i.birthday = time1

      if (i.startTime === '2000-01-01') {
        state.undoneNum++
      }
    }
    // console.log(state.teachersData)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
