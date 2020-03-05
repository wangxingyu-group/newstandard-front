import request from '@/utils/request'

export function search(pagination) {
  return request({
    url: '/fullTextSearch/search',
    method: 'get',
    params: pagination
  })
}
