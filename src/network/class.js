import { request } from './axios'

export function getClassData() {
  return request({
    method: 'get',
    url: '/class',
  })
}
