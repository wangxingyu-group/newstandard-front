import request from '@/utils/request'

export function createServiceDetails(data) {
  return request({
    url: '/knowledgeBase/create',
    method: 'post',
    data
  })
}

export function updateServiceDetails(data) {
  return request({
    url: '/knowledgeBase/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/knowledgeBase/list',
    method: 'get',
    params: query
  })
}

export function fetchServiceDetails(query) {
  return request({
    url: '/knowledgeBase/detail',
    method: 'get',
    params: query
  })
}
