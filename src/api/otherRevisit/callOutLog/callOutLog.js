import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/callOutLog/list',
    method: 'get',
    params: query
  })
}
