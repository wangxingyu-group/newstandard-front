import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    AttributiveBody: '@ctitle(10, 20)',
    numberOfVisits: '16',
    numberOfSuccesses: '12',
    reteOfSuccess: '66%',
    visiting: '8',
    recycled: '0',
    listQuestion: '6',
    finish: '12',
    completionRates: '25%'
  }))
}

export default [
  {
    url: '/successRate/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/successRate/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/successRate/list',
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
  }
]
