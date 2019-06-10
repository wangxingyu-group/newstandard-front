import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    datetime: '@datetime',
    name: '@cname()',
    id: '@increment',
    callInNo: /^1[385][1-9]\d{8}/,
    setId: /^1[029][1-5]\d{8}/,
    setName: '@cname()',
    mark: '@integer(30,100)',
    'status|1': ['是', '否']
  }))
}

export default [
  {
    url: '/chart4/list',
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
  url: '/chart4/detail',
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
  url: '/chart4/pv',
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
  url: '/chart4/create',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
},

{
  url: '/chart4/update',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
}
]

