import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/taskGetRevisitData/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/taskGetRevisitData/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/taskGetRevisitData/list',
    method: 'get',
    params: query
  })
}
