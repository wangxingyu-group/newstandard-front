import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) { // List付值
  List.push(Mock.mock({
    id: '@increment(1)',
    name: '@cname()',
    'gender|1': ['男', '女'],
    idNo: '@integer(152106199003050316, 152106201903050999)',
    callInNo: /^1[385][1-9]\d{8}/,
    callInTime: '@time(\'HH:mm:ss\')',
    customerType: '@ctitle',
    remark: '@ctitle',
    callInDate: '@date(\'yyyy-MM-dd\')',
    'num|1': ['I级', 'Ⅱ级']
  }))
}

export default [
  {
    url: '/quality/list',
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
    url: '/quality/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/quality/pv',
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
    url: '/quality/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/quality/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]

