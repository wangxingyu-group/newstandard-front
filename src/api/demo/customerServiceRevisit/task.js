import request from '@/utils/request' // 引入请求头 拦截等操作内容

export function fetchList(query) {
  return request({
    url: '/task/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/task/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/task/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}
