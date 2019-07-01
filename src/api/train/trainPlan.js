import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/trainPlan/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/trainPlan/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/trainPlan/update',
    method: 'post',
    data
  })
}
