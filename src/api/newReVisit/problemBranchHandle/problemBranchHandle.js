import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/problemBranchHandle/list',
    method: 'get',
    params: query
  })
}
export function createData(data) {
  return request({
    url: '/problemBranchHandle/create',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return request({
    url: '/problemBranchHandle/update',
    method: 'post',
    data
  })
}
