import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/callStreaming/list',
    method: 'get',
    params: query
  })
}
