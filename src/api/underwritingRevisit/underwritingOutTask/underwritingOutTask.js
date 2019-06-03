import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/underwritingOutTask/list',
    method: 'get',
    params: query
  })
}
