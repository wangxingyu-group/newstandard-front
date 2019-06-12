import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    mobile: /^1[385][1-9]\d{8}/,
    'type|1': ['准客户', '客户', '代理人'],
    name: '@cname',
    policyNo: /^8611001023[0-9]\d{5}/,
    comingDate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    serial: /^1001023[1-9]\d{3}/,
    'way|1': ['呼入', '外呼'],
    'bind|1': ['绑定', '未绑定'],
    'flag|1': ['理赔']
  }))
}

export default [
  {
    url: '/callStreaming/list',
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
