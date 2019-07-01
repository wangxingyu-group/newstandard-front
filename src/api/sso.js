import request from '@/utils/request'

export function huanxin() {
  var jwt = require('jsonwebtoken')
  var token = jwt.sign({
    email: 'zhangsan@sinosoft.com.cn',
    name: 'zhangsan',
    state: 'Online' },
  'faa98a78-345f-4661-a60d-30d6ecbd4526',
  { algorithm: 'HS256' })
  // 对接环信
  const url = 'http://sinosoft.kefu.easemob.com/v1/access/jwt?jwt=' + token + '&returnTo={}'
  request({
    url: url,
    method: 'get'
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

