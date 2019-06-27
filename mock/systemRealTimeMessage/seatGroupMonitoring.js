import Mock from 'mockjs'

const List = []
const chartShow = [{
  in: 13081276534,
  name1: '张三',
  time: '30min',
  type: '自主',
  name2: '业务名称'
}]
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    set: '@integer(3, 4)',
    'status|1': ['未签入', '已签入'],
    datetime: '@datetime',
    level: '20',
    inOut: '0/0',
    inOut2: '0/0',
    inOut3: '00:00:00/00:00:00',
    callInNo: /^1[385][1-9]\d{8}/,
    datetime2: '@datetime',
    type: '动态/在线 ',
    'Status|1': ['在线', '不在线']
  }))
}

export default [
  {
    url: '/seatGroupMonitoring/list',
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
          items: pageList,
          show: chartShow
        }
      }
    }
  },

  {
    url: '/seatGroupMonitoring/detail',
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
    url: '/seatGroupMonitoring/pv',
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
    url: '/seatGroupMonitoring/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/seatGroupMonitoring/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

