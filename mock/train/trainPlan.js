import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'ty|1': ['新人班'],
    startDate: '@date(\'yyyy-MM-dd\')',
    'startTime|1': ['上午', '下午'],
    endDate: '@date(\'yyyy-MM-dd\')',
    'endTime|1': ['上午', '下午'],
    receiptDate: '@date(\'yyyy-MM-dd\')',
    planNum: '@integer(2,20)',
    'type|1': ['面授', '视频', '远程'],
    'theme|1': ['讲座', '论坛'],
    num: '@integer(1211,3900)',
    'isN|1': ['是', '否']
  }))
}

export default [
  {
    url: '/trainPlan/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/trainPlan/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/trainPlan/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
