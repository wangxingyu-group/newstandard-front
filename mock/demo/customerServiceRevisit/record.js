import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    idNo: '@integer(152106199001010011, 152106199012319999)',
    name: '@cname()',
    callInNo: /^1[385][1-9]\d{8}/,
    callInTime: '@datetime',
    description: '@ctitle(10, 20)',
    rename: '@datetime',
    remark: '@ctitle',
    type: '自主申请',
    callInNo1: /^1[785][3-9]\d{8}/,
    idType: '居民身份证',
    bankType: '某银行',
    zbls: '一次成功',
    bankId: '@integer(199001010011, 1521061990144)',
    bonusMoney: '@integer(100,10000)',
    type1: '@ctitle(2, 4)',
    remarks: '@ctitle(3, 6)',
    'status|1': ['effective', 'noneffective'],
    datetime: '@datetime',
    seat: '@ctitle(3, 6)'



  }))
}

export default [
  {
    url: '/record/create',
    type: 'post',
    response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
},
{
  url: '/record/update',
    type: 'post',
  response: _ => {
  return {
    code: 20000,
    data: 'success'
  }
}
},
{
  url: '/record/list',
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
