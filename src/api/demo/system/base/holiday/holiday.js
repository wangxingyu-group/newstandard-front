import request from '@/utils/request'

export function createHoliday(data) {
  return request({
    url: '/holiday/create',
    method: 'post',
    data
  })
}

export function updateHoliday(data) {
  return request({
    url: '/holiday/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/holiday/list',
    method: 'get',
    params: query
  })
}

