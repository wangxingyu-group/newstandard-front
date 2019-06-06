import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    fbserviceno: /^11001023[0-9]\d{5}/,
    signdate: '@date(\'yyyy-MM-dd\')',
    policyno: /^8611001023[0-9]\d{5}/,
    'appntsex|1': ['男', '女'],
    mobile: /^1[3568][0-9]\d{8}/,
    quescontent: '@ctitle',
    'riskname|1': ['弘康多倍保', '健康一生医疗保险A款', '弘康弘利相传', '常乐泰保险', '智能大白定售'],
    appntname: '@cname',
    'selltype|1': ['经代', '网销', '直销', '银行代理'],
    'agentcomname|1': ['01-业务员', '07-官网销售', '11-中介', '19微信销售', '68-经代通'],
    'appflag|1': ['有效', '终止', '失效'],
    'fbresult|1': ['完成', '未完成'],
    'salechnl|1': ['淘宝', '惠泽', '淘宝', '苏宁', '京东'],
    'companyName|1': ['北京分公司', '江苏分公司', '河南分公司']
  }))
}

export default [
  {
    url: '/problemBranchHandle/list',
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
    url: '/problemBranchHandle/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/problemBranchHandle/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
