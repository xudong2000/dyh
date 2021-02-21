import { request } from './axios'

//　导出获取所有老师数据方法
export function getTeachersData() {
  return request({
    method: 'get',
    url: '/teacher',
  })
}
