import {
  getStudentsData,
  deleStudentByName,
  fuzzyQueryByName,
} from '../../network/student'

const state = {
  // 保存所有学生数据
  studentsData: [],
  // 保存所有已被删除的学生数据
  removeStuData: [],
  // 学生总数
  stuTotal: 0,
}

const getters = {}

const actions = {
  // 获取所有学生数据
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

  // 通过姓名删除指定学生
  aDeleStudentByName({ commit }, uname) {
    deleStudentByName(uname).then(
      (res) => {
        // console.log(res)
      },
      (err) => {
        console.log('删除数据失败' + err)
      }
    )
  },

  // 根据名字模糊查询
  aFuzzyQueryByName({ state, commit }, uname) {
    fuzzyQueryByName(uname).then(
      (res) => {
        commit('mFuzzyQueryByName', res.data.data)
      },
      (err) => console.log('查询数据失败' + err)
    )
  },
}

const mutations = {
  // 获取所有学生数据
  mGetStudentsData(state, data) {
    state.studentsData = []
    state.removeStuData = []

    // 判断学生是否已被删除
    for (let i of data) {
      if (i.isDelete === false) {
        state.studentsData.push(i)
      } else {
        state.removeStuData.push(i)
      }
    }

    // 将所有日期类型转换成年月
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
    }
    // console.log(state.studentsData)
  },

  // 根据名字模糊查询
  mFuzzyQueryByName(state, data) {
    state.studentsData = []

    // 判断学生是否已被删除
    for (let i of data) {
      if (i.isDelete === false) {
        state.studentsData.push(i)
      } else {
        state.studentsData = []
      }
    }

    // 将所有日期类型转换成年月
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
