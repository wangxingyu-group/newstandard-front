import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/quickSearch/list',
    method: 'get',
    params: query
  })
}
