import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) { // List付值
  List.push(Mock.mock({
    id: '@integer(152106199003050316, 152106201903050999)',
    name: '@increment(1)',
    tel: /^1[34578]\d{9}/,
    idNo: '@integer(152106199003050316, 152106201903050999)',
    callInNo: /^1[385][1-9]\d{8}/,
    callInTime: '@time(\'HH:mm:ss\')',
    customerType: '@integer(166106199003050316, 166106201903050999)',
    nameCus: '@name()',
    callInDate: '@date(\'yyyy-MM-dd\')',
    'gender|1': ['类型1', '类型2', '类型3'],
    'num|1': ['I级', 'Ⅱ级'],
    url: /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/
  }))
}

export default [
  {
    url: '/qualityAssurance/list',
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
          items: pageList
        }
      }
    }
  },

  {
    url: '/qualityAssurance/detail',
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
    url: '/qualityAssurance/pv',
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
    url: '/qualityAssurance/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/qualityAssurance/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

