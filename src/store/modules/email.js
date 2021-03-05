import { getEmailData } from '../../network/email'

const state = {}

const getters = {}

const actions = {
  // 获取邮箱验证
  aGetEmailData({ commit }) {
    let userObj = { userName: 'root谭总', password: 123456 }
    getEmailData(userObj).then(
      (res) => console.log(res),
      (err) => {
        console.log('获取数据失败' + err)
      }
    )
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
