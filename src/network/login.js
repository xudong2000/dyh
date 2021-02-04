import { request } from './axios'

// 导出获取所有学生数据函数
// export function getStudentsData() {
//   return request({
//     method: 'get',
//     url: '/student',
//   })
// }

// 导出通过姓名获取学生数据函数
export function getStudentsDataByName(uname) {
  return request({
    method: 'get',
    url: '/curStudent?s_name=' + uname,
  })
}

//　导出获取所有老师数据函数
// export function getTeachersData() {
//   return request({
//     method: 'get',
//     url: '/teacher',
//   })
// }

// 导出通过姓名获取老师数据函数
export function getTeachersDataByName(uname) {
  return request({
    method: 'get',
    url: '/curTeacher?t_name=' + uname,
  })
}

// 导出获取所有管理员数据函数
// export function getAdminsData() {
//   return request({
//     method: 'get',
//     url: '/admin',
//   })
// }

// 导出通过姓名获取管理员数据函数
export function getAdminsDataByName(uname) {
  return request({
    method: 'get',
    url: '/curAdmin?a_name=' + uname,
  })
}
