import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    datetime: '@datetime',
    'status|1': ['一般', '中等', '高级'],
    name: '@ctitle(3, 6)',
    numberOfServiceOrders: '@integer(50,200)',
    transferQuantity: '@integer(10,30)',
    returnAmountOfTransferOrder: '@integer(10,20)'
  }))
}

export default [
  {
    url: '/chart2/list',
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
  url: '/chart2/detail',
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
  url: '/chart2/pv',
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
  url: '/chart2/create',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
},

{
  url: '/chart2/update',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
}
]

