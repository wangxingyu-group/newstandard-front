import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    date: '@date',
    time:  '@time',
    quantityOfSuccess: '@integer(10,100)',
    quantityOfFailure: '@integer(10,50)'

  }))
}

export default [
  {
    url: '/chart3/list',
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
  url: '/chart3/detail',
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
  url: '/chart3/pv',
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
  url: '/chart3/create',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
},

{
  url: '/chart3/update',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
}
]

