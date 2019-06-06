import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/comprehensiveQuery/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/comprehensiveQuery/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/comprehensiveQuery/update',
    method: 'post',
    data
  })
}
