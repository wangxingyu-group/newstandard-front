import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/distribution/list',
    method: 'get',
    params: query
  })
}
