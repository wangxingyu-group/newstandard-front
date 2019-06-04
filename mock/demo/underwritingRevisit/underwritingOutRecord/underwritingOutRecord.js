import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    serial: /^86110026000[0-9]\d{5}/,
    name: '@cname',
    'content|1': ['加费', '标准通过', '核保资料', '核保疑问,加费', '拒保,核保资料'],
    'riskName|1': ['弘康多啦A保', '健康一生重疾险', '弘利相传保障险', '弘康智能大白定售'],
    'result|1': ['待跟进', '暂存', '完成']
  }))
}

export default [
  {
    url: '/underwritingOutRecord/list',
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
