import Mock from 'mockjs'

const List = []
const List2 = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'scene|1': ['咨询', '售后', '业务办理'],
    context: '@ctitle(50, 100)'
  }))
}

for (let i = 0; i < count; i++) {
  List2.push(Mock.mock({
    id: '@increment',
    name: '@cname',
    'product|1': ['产品1', '产品2', '产品3'],
    money: '@integer(100000, 200000)',
    'status|1': ['生效', '过期']
  }))
}

export default [
  {
    url: '/call/talk',
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
  },
  {
    url: '/call/order',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const pageList = List2.filter((item, index) => index < limit * page && index >= limit * (page - 1))
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
