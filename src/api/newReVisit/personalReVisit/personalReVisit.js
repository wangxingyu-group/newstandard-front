import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/personalReVisit/list',
    method: 'get',
    params: query
  })
}
