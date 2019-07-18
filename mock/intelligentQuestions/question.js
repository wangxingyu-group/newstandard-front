import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    type: '选择题',
    description: '@ctitle(10, 20)',
    'status|1': ['effective', 'noneffective'],
    a: '选项a',
    aJumpTo: '@Integer(1,99)',
    b: '选项b',
    bJumpTo: '@Integer(1,99)',
    c: '选项c',
    cJumpTo: '@Integer(1,99)',
    d: '选项d',
    dJumpTo: '@Integer(1,99)',
    createTime: '@date'
  }))
}

export default [
  {
    url: '/question/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/question/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/question/detail',
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
    url: '/question/list',
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
