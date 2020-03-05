import Mock from 'mockjs'

export default [
  {
    url: '/fullTextSearch/search',
    type: 'get',
    response: config => {
      const list = []
      const count = 20
      for (let i = 0; i < count; i++) {
        list.push(Mock.mock({
          id: '@increment',
          title: '@ctitle(10,15)',
          author: '@cname(2,3)',
          createTime: '@datetime',
          context: '@cparagraph(10,40)',
          attachment: '@title(8,12)',
          fileName: '@title(8,12)',
          'ext|1': ['.txt', '.pdf', '.docx', '.xlsx']
        }))
      }
      return {
        code: 20000,
        data: {
          total: list.length,
          list: list
        }
      }
    }
  }
]
