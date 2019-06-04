import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    policyNo: /^8611001023[0-9]\d{5}/,
    name: '@cname',
    'idCard|1': ['110101198001010037', '230101198001010093', '230101198001010130', '220101198001010091'],
    dealNum: /^110010[0-9]\d{4}/,
    number: /^[0-9]/,
    'result|1': ['已处理', '未处理'],
    'isMore|1': ['是', '否']
  }))
}

export default [
  {
    url: '/taskPool/list',
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
