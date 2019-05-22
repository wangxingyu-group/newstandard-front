import Mock from 'mockjs'

const count = 5

const ListUser = []

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

// 用户管理
for (let i = 0; i < count; i++) {
  ListUser.push(Mock.mock({
    id: '@increment',
    timeCre: Mock.Random.date('T'),
    timeUp: '@timeCre',
    customer: Mock.Random.cname(), // 用户姓名
    'model|1': ['道歉短信', '邀请短信', '确认短信', '通知短信', '警告短信'],
    content_short: 'mock data',
    content: baseContent,
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    platforms: ['a-platform']
  }))
}

export default [
  // 用户管理
  {
    url: '/model/fires',
    type: 'get',
    response: config => {
      const { type, projectNum, customer, page = 1, limit = 20, sort } = config.query

      let mockFiresList = ListUser.filter(item => {
        if (projectNum && item.projectNum.indexOf(projectNum) < 0) return false
        if (customer && item.customer.startsWith(customer) < 0) return false
        if (type && item.type !== type) return false
        return true
      })

      if (sort === '-id') {
        mockFiresList = mockFiresList.reverse()
      }

      const pageList = mockFiresList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockFiresList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/model/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/model/pv',
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
    url: '/model/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 用户新建
  {
    url: '/model/createF',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/model/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

