import { request } from './axios'

// 导出通过参数获取学生指定数据方法
export function getStudentsDataByParams(key, value) {
  return request({
    method: 'get',
    url: '/curStudent?' + key + '=' + value,
  })
}

// 导出通过姓名获取老师数据方法
export function getTeachersDataByParams(key, value) {
  return request({
    method: 'get',
    url: '/curTeacher?' + key + '=' + value,
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
