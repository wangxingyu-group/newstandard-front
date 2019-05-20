import Mock from 'mockjs'

const List = []
const count = 10

const ListUser = []

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['US', 'CN', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

// 用户管理
for (let i = 0; i < count; i++) {
  ListUser.push(Mock.mock({
    id: '@increment',
    projectNum: Mock.Random.id(), // 用户编号
    timestamp: Mock.Random.date('T'),
    mobilephone: /^1[385][1-9]\d{8}/, // 用户手机号码
    customer: Mock.Random.cname(), // 用户姓名
    'company|1': ['京东', '阿里巴巴', '腾讯', '网易'],
    content_short: 'mock data',
    content: baseContent,
    'type|1': ['normal', 'locked', 'delete'], // 用户状态
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
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

  // 用户管理
  {
    url: '/user/fires',
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
    url: '/user/detail',
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
    url: '/user/pv',
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
    url: '/user/create',
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
    url: '/user/createF',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/user/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

