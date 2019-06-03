import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(5,10)',
    author: '@cname',
    description: '@ctitle(25, 60)',
    'publish|1': ['yes', 'no'],
    'gender|1': ['0', '1'],
    'isOld|1': ['0', '1'],
    'region|1': ['北京', '天津', '上海', '深圳'],
    'status|1': ['effective', 'noneffective'],
    createTime: '@datetime'
  }))
}

export default [
  {
    url: '/questionnaire/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/questionnaire/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/questionnaire/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const question of list) {
        if (question.id === id) {
          return {
            code: 20000,
            data: question
          }
        }
      }
    }
  },
  {
    url: '/questionnaire/list',
    type: 'get',
    response: config => {
      const { status, from, to, page = 1, limit = 10 } = config.query
      const mockList = list.filter(item => {
        if (status && item.status !== status) return false
        if (from && new Date(from).getTime() > new Date(item.createTime).getTime()) return false
        if (to && new Date(to).getTime() < new Date(item.createTime).getTime()) return false
        return true
      })
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
