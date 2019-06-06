import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    contNo: /^11001023[0-9]\d{5}/,
    signDate: '@date(\'yyyy-MM-dd\')',
    policyNo: /^8611001023[0-9]\d{5}/,
    customSignDate: '@date(\'yyyy-MM-dd\')',
    receiptDate: '@date(\'yyyy-MM-dd\')',
    contractedDate: '@date(\'yyyy-MM-dd\')',
    'product|1': ['弘康多倍保', '健康一生医疗保险A款', '弘康弘利相传', '常乐泰保险', '智能大白定售'],
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
    agentName: '@cname',
    'agent|1': ['淘宝', '惠泽', '淘宝', '苏宁', '京东'],
    'companyName|1': ['北京分公司', '江苏分公司', '河南分公司'],
    insuredname: '@cname',
    appntappage: /^\d{2}/,
    'appntsex|1': ['男', '女'],
    appntbirthday: '@date(\'yyyy-MM-dd\')',
    'idno|1': ['320101198001010079'],
    mobile: /^1[3568][0-9]\d{8}/,
    homeaddress: '@caddress',
    email: '@cemail',
    amnt: /^\d{6}/,
    payendyear: '20年',
    insuyear: '10年',
    'selltype|1': ['微信', '淘宝'],
    lastcalldate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    lastcallphone: /^1[3568][0-9]\d{8}/,
    num: /^\d{1}/,
    yyday: /^\d{2}/,
    questiontype: '@ctitle',
    'mettertype|1': ['有效', '终止', '失效'],
    'appflag|1': ['有效', '终止', '失效']
  }))
}

export default [
  {
    url: '/problemManagement/list',
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
    url: '/problemManagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/problemManagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
