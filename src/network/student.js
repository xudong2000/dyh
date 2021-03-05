import { request } from './axios'

// 导出获取所有学生数据方法
export function getStudentsData() {
  return request({
    method: 'get',
    url: '/student',
  })
}

// 导出添加学生数据方法
export function addStudentsData(data) {
  return request({
    method: 'post',
    url: '/student',
    data: data,
  })
}

// 导出根据学生名删除当前学生数据方法
export function deleStudentByName(uname) {
  return request({
    method: 'get',
    url: '/deleStudent?name=' + uname,
  })
}

// 导出根据学生名修改当前学生数据方法
export function updateStudentByName([uname, data]) {
  return request({
    method: 'post',
    url: '/setStudent',
    data: [uname, data],
  })
}

// 导出根据名字模糊查询
export function fuzzyQueryByName(uname) {
  return request({
    method: 'post',
    url: '/fuzzyStudent',
    data: uname,
  })
}
