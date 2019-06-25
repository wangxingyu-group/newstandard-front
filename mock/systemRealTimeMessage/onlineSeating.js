import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    id2: '@integer(1, 10)',
    'status|1': ['未发送', '发送中', '已发送'],
    answer: '@integer(5, 10)',
    in: '@integer(10, 20)',
    datetime: '@datetime',
    answer2: '@integer(10, 15)',
    out: '@integer(10, 20)',
    datetime2: '@datetime',
    createTime: '@datetime',
    updateTime: '@datetime',
    lastAnswer: '@datetime'
  }))
}

export default [
  {
    url: '/onlineSeating/list',
    type: 'get',
    response: config => {
      const { name, idNo, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (name && item.name !== name) return false
        if (idNo && item.idNo !== idNo) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/onlineSeating/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const customer of List) {
        if (customer.id === +id) {
          return {
            code: 20000,
            data: customer
          }
        }
      }
    }
  },

  {
    url: '/onlineSeating/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/onlineSeating/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/onlineSeating/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

