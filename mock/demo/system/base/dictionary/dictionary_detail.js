import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    dictionaryType: /^[A-Za-z\d]{6,9}$/,
    dictionaryName: /^[0-9]$/,
    dictionaryCode: '@increment',
    'sort|1': ['1', '2', '3', '4'],
    remark: '@ctitle',
    'chName|1': ['启用', '禁用'],
    'frName|1': ['启用', '禁用']
  }))
}

export default [
  {
    url: '/dictionary_detail/detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  }
]
