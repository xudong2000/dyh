import { request } from './axios'

export function getStudentsData() {
  return request({
    method: 'get',
    url: '/student',
  })
}
