import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    phoneNo: /^1[385][1-9]\d{8}/,
    content: '@ctitle(25, 60)',
    'status|1': ['未发送', '发送中', '已发送'],
    sender: '@cname',
    sendDate: '@date',
    sendTime: '@time',
    createTime: '@datetime'
  }))
}

export default [
  {
    url: '/history/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/history/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/history/detail',
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
    url: '/history/list',
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
