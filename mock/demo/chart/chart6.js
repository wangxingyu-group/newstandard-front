import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    startTime: '@datetime(\'yyyy-MM-dd hh:MM:ss\')',
    endTime: '@datetime(\'yyyy-MM-dd hh:MM:ss\')',
    timer_clock: '00:00:09',
    'status|1': ['是', '否'],
    name: '@cname()',
    'group|1': ['信用卡单位', '教育机构'],
    id: '@increment',
    callInNo: /^1[385][1-9]\d{8}/,
    callOutNo: /^1[385][1-9]\d{8}/,
    setId: /^1[029][1-5]\d{8}/,
    setName: '@cname()',
    mark: '@integer(30,100)',
    date: '@date(\'yyyy-MM-dd\')',
    num: '@integer(2,10)',
    time: '@time(\'HH:mm:ss\')'
  }))
}

export default [
  {
    url: '/chart6/list',
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
  }
]

