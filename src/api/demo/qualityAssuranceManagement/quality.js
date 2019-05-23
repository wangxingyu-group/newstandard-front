import request from '@/utils/request' // 引入请求头 拦截等操作

export function fetchList(query) {
  return request({
    url: '/quality/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/quality/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/quality/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/quality/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/quality/update',
    method: 'post',
    data
  })
}
