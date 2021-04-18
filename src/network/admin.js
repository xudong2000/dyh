import { request } from './axios'

//　导出获取所有管理员数据方法
export function getAdminsData() {
  return request({
    method: 'get',
    url: '/admin',
  })
}

// 导出删除指定管理员数据方法
export function deleteAdminsData(data) {
  return request({
    method: 'post',
    url: '/deleAdmin',
    data,
  })
}
