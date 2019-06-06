import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    task: '@ctitle(2, 5)',
    group: '@integer(1,20)',
    expression: '@ctitle(5, 10)',
    address: '@ctitle(10, 15)',
    'status|1': ['effective', 'noneffective'],
    remarks: '@ctitle(3, 6)',
    datetime: '@datetime'

  }))
}

export default [
  {
    url: '/taskGetRevisitData/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/taskGetRevisitData/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/taskGetRevisitData/list',
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
