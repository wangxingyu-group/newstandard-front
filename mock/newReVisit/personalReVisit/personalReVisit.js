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
    'reVisit|1': ['完成', '未完成'],
    describe: '@ctitle',
    appntno: /^1001023[1-9]\d{3}/,
    'productName|1': ['弘康多倍保', '健康一生医疗保险A款', '弘康弘利相传', '常乐泰保险', '智能大白定售'],
    prem: /^[1-9]\d{4}/,
    appName: '@cname',
    days: /^[1-9]\d{2}/,
    'channel|1': ['经代', '网销', '直销', '银行代理'],
    // 'status|1': ['01-业务员', '07-官网销售', '11-中介', '19微信销售', '68-经代通'],
    'status|1': ['有效', '终止', '失效'],
    'result|1': ['完成', '未完成'],
    count: /^[1-9]\d{1}/,
    lastDateTime: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    number: /^[1-9]\d{2}/,
    'orderflag|1': ['是', '否'],
    orderdate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    fbcount: /^[1-9]/,
    'ismany|1': ['是', '否'],
    examnote: '@ctitle'
  }))
}

export default [
  {
    url: '/personalReVisit/list',
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
