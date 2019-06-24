import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/timetable/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/timetable/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/timetable/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/timetable/list',
    method: 'get',
    params: query
  })
}
