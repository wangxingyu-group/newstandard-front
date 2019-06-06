import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/emailBranchHandle/list',
    method: 'get',
    params: query
  })
}
export function createDistribution(data) {
  return request({
    url: '/emailBranchHandle/create',
    method: 'post',
    data
  })
}

export function updateDistribution(data) {
  return request({
    url: '/emailBranchHandle/update',
    method: 'post',
    data
  })
}
