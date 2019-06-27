import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/seatGroupMonitoring/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/seatGroupMonitoring/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/seatGroupMonitoring/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/seatGroupMonitoring/list',
    method: 'get',
    params: query
  })
}
