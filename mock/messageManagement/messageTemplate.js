import Mock from 'mockjs'

const count = 100

const listUser = []

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

// 用户管理
for (let i = 0; i < count; i++) {
  listUser.push(Mock.mock({
    id: '@increment',
    'roleType|1':['有效', '冻结', '删除'],
    'userType|1':['正常', '禁用', '删除'],
    'roleName|1':['质检员', "销售员", "主管", "经理", "维修人员", "系统管理员"],
    'menuType|1':['normal', "locked"],
    projectNum: Mock.Random.id(), // 用户编号
    timestamp: Mock.Random.date(),
    mobilephone: /^1[385][1-9]\d{8}/, // 用户手机号码
    customer: Mock.Random.name(), // 用户姓名
    cName:Mock.Random.cname(), //中文姓名
    'company|1': ['京东', '阿里巴巴', '腾讯', '网易'],
    content_short: 'mock data',
    content: baseContent,
    'type|1': ['normal', 'locked', 'delete'], // 用户状态
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    platforms: ['a-platform'],
    type: '选择题',
    cEmail: '@email',
    'status|1': ['effective', 'noneffective'],
    description: '@ctitle(25, 60)',
    menuDescription: '@ctitle(2, 5)',
    englishName: '/[a-z]{2}[A-Z]{2}[0-9]/',
    createTime: '@datetime',
    from: +Mock.Random.date('T'),
    timeUp: '@timeCre',
    title: '@title',
    url: '@url("http")',
    'modelName|1': ['道歉短信', "祝福短信", "警告短信"],
    'content|1': ['您刚刚电话咨询的健康投保的链接为：**********************。', '新增短信模板名称及范文内容    ， ，  ， 修改短信模板'],
  }))
}

export default [
  {
    url: '/template/create',
    type: 'post',
    response: () => {
    return {
      code: 20000,
      data: 'success'
    }
  }
},
{
  url: '/template/update',
    type: 'post',
  response: () => {
  return {
    code: 20000,
    data: 'success'
  }
}
},
{
  url: '/template/detail',
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
  url: '/template/list',
    type: 'get',
  response: config => {
  const { modelName, from, page = 1, limit = 10 } = config.query
  const mockList = listUser.filter(item => {
    if (modelName && item.modelName.indexOf(modelName) === -1) return false
    if (from && new Date(from).getTime() > new Date(item.timestamp).getTime()) return false
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
