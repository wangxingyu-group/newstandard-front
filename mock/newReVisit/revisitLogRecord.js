import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    number: /^1[396][1-9]\d{8}/,
    datetime: '@datetime',
    name: '@cname()',
    name2: '@cname()',
    bonusMoney: '@integer(1000,10000)',
    datetime2: '@datetime',
    result: '满意',
    description: '@ctitle(5, 15)',
    channel: '@ctitle(5, 10)',
    sales: '@ctitle(5, 10)'
}))
}

export default [
  {
    url: '/revisitLogRecord/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/revisitLogRecord/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/revisitLogRecord/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  }
]
