import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/taskPool/list',
    method: 'get',
    params: query
  })
}
