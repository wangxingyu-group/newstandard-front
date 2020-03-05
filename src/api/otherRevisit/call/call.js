import request from '@/utils/request'

export function fetchListTalk(query) {
  return request({
    url: '/call/talk',
    method: 'get',
    params: query
  })
}

export function fetchListOrder(query) {
  return request({
    url: '/call/order',
    method: 'get',
    params: query
  })
}
