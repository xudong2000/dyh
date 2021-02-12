import { request } from './axios'

// 导出通过姓名获取学生数据方法
export function getStudentsDataByName(uname) {
  return request({
    method: 'get',
    url: '/curStudent?name=' + uname,
  })
}

//　导出获取所有老师数据函数
// export function getTeachersData() {
//   return request({
//     method: 'get',
//     url: '/teacher',
//   })
// }

// 导出通过姓名获取老师数据方法
export function getTeachersDataByName(uname) {
  return request({
    method: 'get',
    url: '/curTeacher?name=' + uname,
  })
}

// 导出获取所有管理员数据函数
// export function getAdminsData() {
//   return request({
//     method: 'get',
//     url: '/admin',
//   })
// }

// 导出通过姓名获取管理员数据方法
export function getAdminsDataByName(uname) {
  return request({
    method: 'get',
    url: '/curAdmin?name=' + uname,
  })
}
