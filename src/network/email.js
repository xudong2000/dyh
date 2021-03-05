import { request2 } from './axios'

//　导出获取邮箱验证
export function getEmailData(userVo) {
  return request2({
    method: 'post',
    url: '/user/email',
    data: userVo,
  })
}
