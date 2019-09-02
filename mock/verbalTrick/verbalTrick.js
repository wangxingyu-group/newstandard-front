import Mock from 'mockjs'

const topNode = []
const count = 5
const detail = []
const count1 = 8
for (let i = 0; i < 3; i++) {
  topNode.push(Mock.mock({
    parentId: null,
    parentLabel: '',
    id: '@increment',
    'label|1': ['测试库', '生产库', '模拟库'],
    level: 1
  }))
}

for (let i = 0; i < count1; i++) {
  detail.push(Mock.mock({
    id: '@increment',
    'title|1': ['新契约', '投诉', '预约', '理赔','回访'],
    'product|1': ['投连险', '寿险', '团险', '个险'],
    author: '@cname',
    time: '@datetime(\'yyyy-MM-dd hh:MM:ss\')',
    download: '@integer(10,20)'
  }))
}
const initData = (node, level) => {
  if (node) {
    for (let i = 0; i < node.length; i++) {
      const tempNode = []
      for (let j = 0; j < count; j++) {
        tempNode.push(Mock.mock({
          parentId: node[i].id,
          parentLabel: node[i].label,
          id: '@increment',
          'label|1': ['新契约话术', '回访话术', '投诉话术', '准客户话术', '预约话术', '投保须知'],
          level: node[i] + 1
        }))
      }
      if (--level > 1) {
        initData(tempNode, level)
      }
      node[i].children = tempNode
    }
  }
}

initData(topNode, 2)

export default [
  {
    url: '/verbalTrick/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/verbalTrick/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/verbalTrick/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          items: topNode
        }
      }
    }
  },
  {
    url: '/verbalTrick/detail',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          items: detail,
          total: detail.length
        }
      }
    }
  }
]
