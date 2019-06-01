import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cname()',
    'gender|1': ['0', '1'],
    idNo: '@integer(152106199001010011, 152106199012319999)',
    callInNo: /^1[385][1-9]\d{8}/,
    callInTime: '@datetime',
    customerType: '准客户',
    remark: '@ctitle'
  }))
}

export default [
  {
    url: '/preCustomer/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/preCustomer/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/preCustomer/list',
    type: 'get',
    response: config => {
      const { name, idNo, page = 1, limit = 10, sort } = config.query
      let mockList = List.filter(item => {
        if (name && item.name !== name) return false
        if (idNo && item.idNo != idNo) return false
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
    url: '/preCustomer/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const preCustomer of List) {
        if (preCustomer.id === +id) {
          return {
            code: 20000,
            data: preCustomer
          }
        }
      }
    }
  }
]
