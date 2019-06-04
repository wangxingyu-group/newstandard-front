import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/underwritingOutRecord/list',
    method: 'get',
    params: query
  })
}
