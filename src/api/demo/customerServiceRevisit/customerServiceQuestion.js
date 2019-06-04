import request from '@/utils/request' // 引入请求头 拦截等操作内容

export function fetchList(query) {
  return request({
    url: '/customerServiceQuestion/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/customerServiceQuestion/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/customerServiceQuestion/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/customerServiceQuestion/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/customerServiceQuestion/update',
    method: 'post',
    data
  })
}
