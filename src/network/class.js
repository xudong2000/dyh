import { request } from './axios'

// 导出获取所有班级
export function getClassData() {
  return request({
    method: 'get',
    url: '/class',
  })
}

// 导出根据班级号添加学生
export function addStudentByClass(data) {
  return request({
    method: 'post',
    url: '/addName',
    data,
  })
}

// 导出根据班级号删除学生
export function deleStudentByClass(data) {
  return request({
    method: 'post',
    url: '/deleName',
    data,
  })
}
