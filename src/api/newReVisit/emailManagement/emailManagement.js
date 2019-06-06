import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/emailManagement/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/emailManagement/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/emailManagement/update',
    method: 'post',
    data
  })
}
