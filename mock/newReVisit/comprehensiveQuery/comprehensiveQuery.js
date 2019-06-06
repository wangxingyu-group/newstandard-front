import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    contno: /^8611001023[0-9]\d{5}/,
    signdate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    customgetpoldate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    getpoldate: '@dateTime(\'yyyy-MM-dd HH:mm:ss\')',
    agentname: '@cname',
    appntname: '@cname',
    'appntsex|1': ['男', '女'],
    mobile: /^1[3568][0-9]\d{8}/,
    'agentcomname|1': ['淘宝', '京东', '苏宁'],
    'managecomname|1': ['北京分公司', '江苏分公司', '河南分公司'],
    'riskname|1': ['弘康多倍保', '健康一生医疗保险A款', '弘康弘利相传', '常乐泰保险', '智能大白定售'],
    'salechnl|1': ['网销', '经代', '直销'],
    'selltype|1': ['惠泽经纪', '惠泽经纪', '微信'],
    'appflag|1': ['失效', '终止', '有效'],
    'yydata|1': ['是', '否'],
    examnote: '@ctitle',
    'mailstatus|1': ['需发信函', '已发信函', '已收信函', '邮寄信函', '上门信函', '信函件返回'],
    'enddepartment|1': ['营业部', '经代部'],
    'fbnowstatus|1': ['已回访', '未回访', '已预约'],
    'calltype|1': ['电话回访', '线上回访'],
    agentcode: /^23023[1-9]\d{5}/,
    'fbresult|1': ['完成', '未完成'],
    fbcount: /^[1-9]\d{1}/,
    wttype: '@ctitle'
  }))
}

export default [
  {
    url: '/comprehensiveQuery/list',
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
    url: '/comprehensiveQuery/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/comprehensiveQuery/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
