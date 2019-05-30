import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/questionnaire/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/questionnaire/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/questionnaire/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/questionnaire/list',
    method: 'get',
    params: query
  })
}
