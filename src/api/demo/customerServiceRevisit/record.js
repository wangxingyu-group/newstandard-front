import request from '@/utils/request' // 引入请求头 拦截等操作内容

export function fetchList(query) {
  return request({
    url: '/record/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/record/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/record/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/record/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/record/update',
    method: 'post',
    data
  })
}
