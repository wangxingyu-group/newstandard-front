import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    policyNo: '@Integer(11)',
    applicant: '@cname',
    idCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    customerNo: '@Integer(100000,900000)',
    insured: '@cname',
    'agent|1': ['代理机构1', '代理机构2', '代理机构3'],
    effectiveDate: '@datetime',
    amount: '200000',
    premium: '@Integer(500,10000)',
    'risk|1': ['重疾险', '投连险', '保障险'],
    plan: '',
    'status|1': ['生效', '失效']
  }))
}

export default [
  {
    url: '/personalInsurance/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/personalInsurance/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/personalInsurance/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const question of list) {
        if (question.id === id) {
          return {
            code: 20000,
            data: question
          }
        }
      }
    }
  },
  {
    url: '/personalInsurance/list',
    type: 'get',
    response: config => {
      const { status, from, to, page = 1, limit = 10 } = config.query
      const mockList = list.filter(item => {
        if (status && item.status !== status) return false
        if (from && new Date(from).getTime() > new Date(item.createTime).getTime()) return false
        if (to && new Date(to).getTime() < new Date(item.createTime).getTime()) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
