import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    idNo: '@integer(152106199001010011, 152106199012319999)',
    name: '@cname()',
    callInNo: /^1[385][1-9]\d{8}/,
    description: '@ctitle(5, 15)',
    idNo: '@integer(152106199001010011, 152106199012319999)',
    datetime: '@datetime',
    name: '@cname()',
    callInNo: /^1[385][1-9]\d{8}/

  }))
}

export default [
  {
    url: '/customerServiceTransfer/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/customerServiceTransfer/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/customerServiceTransfer/list',
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
    url: '/customerServiceTransfer/detail',
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
