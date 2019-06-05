import request from '@/utils/request' // 引入请求头 拦截等操作内容

export function fetchList(query) {
  return request({
    url: '/claimsCallOutChat/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/claimsCallOutChat/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/claimsCallOutChat/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/claimsCallOutChat/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/claimsCallOutChat/update',
    method: 'post',
    data
  })
}
