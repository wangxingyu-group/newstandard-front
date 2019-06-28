import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    signDate: '@date(\'yyyy-MM-dd\')',
    policyNo: /^8611001023[0-9]\d{5}/,
    customSignDate: '@date(\'yyyy-MM-dd\')',
    receiptDate: '@date(\'yyyy-MM-dd\')',
    contractedDate: '@date(\'yyyy-MM-dd\')',
    'productName|1': ['中科软重疾险', '中科软保障险', '中科软投连险', '中科软保障险', '中科软定期寿险'],
    prem: /^[1-9]\d{4}/,
    appName: '@cname',
    days: /^[1-9]\d{2}/,
    'channel|1': ['经代', '网销', '直销', '银行代理'],
    // 'status|1': ['01-业务员', '07-官网销售', '11-中介', '19微信销售', '68-经代通'],
    'status|1': ['有效', '终止', '失效'],
    'result|1': ['完成', '未完成'],
    count: /^[1-9]\d{1}/,
    lastDateTime: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    number: /^[1-9]\d{2}/
  }))
}

export default [
  {
    url: '/distribution/list',
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
  },
  {
    url: '/distribution/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/distribution/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
