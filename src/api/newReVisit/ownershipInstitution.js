import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/ownershipInstitution/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/ownershipInstitution/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/ownershipInstitution/list',
    method: 'get',
    params: query
  })
}
