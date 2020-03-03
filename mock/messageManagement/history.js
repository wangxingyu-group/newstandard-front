import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@integer(152106199003050316, 152106201903050999)',
    phoneNo: /^1[385][1-9]\d{8}/,
    content: '@ctitle(8, 16)',
    'status|1': ['未发送', '发送中', '已发送'],
    sender: '@cname',
    sendDate: '@date',
    sendTime: '@time',
    createTime: '@datetime',
    name: '@increment(1)',
    tel: /^1[34578]\d{9}/,
    idNo: '@integer(152106199003050316, 152106201903050999)',
    callInNo: /^1[385][1-9]\d{8}/,
    callInTime: '@time(\'HH:mm:ss\')',
    customerType: '@integer(166106199003050316, 166106201903050999)',
    nameCus: '@cname()',
    opertor: '@cname()',
    callInDate: '@date(\'yyyy-MM-dd\')',
    callInDateA: '@date(\'yyyy-MM-dd\')',
    'gender|1': ['类型1', '类型2', '类型3'],
    'state|1': ['已质检', '已复核', '已申诉'],
    'num|1': ['I级', 'Ⅱ级'],
    url: /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/,
    reason: '@ctitle',
    reasonA: '@ctitle',
    score: '@integer(80, 100)'
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
