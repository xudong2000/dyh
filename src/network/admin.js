import { request } from './axios'

//　导出获取所有管理员数据方法
export function getAdminsData() {
  return request({
    method: 'get',
    url: '/admin',
  })
}
