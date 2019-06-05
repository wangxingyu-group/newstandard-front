import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/problemManagement/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/problemManagement/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/problemManagement/update',
    method: 'post',
    data
  })
}
