import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/distribution/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/distribution/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/distribution/update',
    method: 'post',
    data
  })
}
