import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/backlogTaskPool/list',
    method: 'get',
    params: query
  })
}
