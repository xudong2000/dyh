import { request } from './axios'

//　导出获取所有老师数据方法
export function getTeachersData() {
  return request({
    method: 'get',
    url: '/teacher',
  })
}

// 导出添加老师数据方法
export function addTeachersData(data) {
  return request({
    method: 'post',
    url: '/teacher',
    data: data,
  })
}

// 导出根据老师名删除当前老师数据方法
export function deleTeacherByName(uname) {
  return request({
    method: 'get',
    url: '/deleTeacher?name=' + uname,
  })
}
