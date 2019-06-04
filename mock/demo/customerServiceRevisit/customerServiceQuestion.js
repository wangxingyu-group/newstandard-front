import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    description: '@ctitle(10, 20)',
    datetime: '@datetime',
    name: '@cname()',
    type: '通用',
    questionType: '选择题',
    'status|1': ['effective', 'noneffective']

  }))
}

export default [
  {
    url: '/customerServiceQuestion/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/customerServiceQuestion/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/customerServiceQuestion/list',
    type: 'get',
    response: config => {
      const { name, idNo, page = 1, limit = 10, sort } = config.query
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
    url: '/customerServiceQuestion/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const agent of List) {
        if (agent.id === +id) {
          return {
            code: 20000,
            data: agent
          }
        }
      }
    }
  }
]
