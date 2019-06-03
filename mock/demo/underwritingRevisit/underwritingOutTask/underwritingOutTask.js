import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    dateTime: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    'result|1': ['未转办', '未退回', '被退回'],
    insuredName: '@cname',
    'insuredIdCard|1': ['110101198001010037', '230101198001010093', '230101198001010130', '220101198001010091'],
    proposalNo: /^11026000024[0-9]\d{3}/,
    appName: '@cname',
    'client|1': ['client4', 'client2', '', 'client3'],
    'agentName|1': ['代理机构1', '代理机构2', '代理机构3']
  }))
}

export default [
  {
    url: '/underwritingOutTask/list',
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
