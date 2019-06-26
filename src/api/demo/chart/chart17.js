import request from '@/utils/request' // 引入请求头 拦截等操作内容

export function fetchList(query) {
  return request({
    url: '/chart17/list',
    method: 'get',
    params: query
  })
}

