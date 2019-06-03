import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'dictionaryType|1': ['sell', 'Buiness_Type', 'CallState', 'ContactType', 'Gender_Type', 'Jump_Type'],
    'dictionaryName|1': ['业务类型', '联系方式里的联系类型', '代理人分的渠道', '用于客户管理', '用于回访试题跳转方式'],
    remark: '@ctitle'
  }))
}

export default [
  {
    url: '/dictionary/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/dictionary/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/dictionary/list',
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
