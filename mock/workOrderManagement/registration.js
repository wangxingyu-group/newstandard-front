import Mock from 'mockjs'

const topNode = []
const count = 10

topNode.push(Mock.mock({
  parentId: null,
  parentLabel: '',
  id: '@increment',
  label: '@ctitle',
  level: 1
}))

const initData = (node, level) => {
  if (node) {
    for (let i = 0; i < node.length; i++) {
      const tempNode = []
      for (let j = 0; j < count; j++) {
        tempNode.push(Mock.mock({
          parentId: node[i].id,
          parentLabel: node[i].label,
          id: '@increment',
          label: '@ctitle',
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

initData(topNode, 3)

export default [
  {
    url: '/registration/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/registration/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/registration/list',
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
    url: '/registration/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const preCustomer of topNode) {
        if (preCustomer.id === +id) {
          return {
            code: 20000,
            data: preCustomer
          }
        }
      }
    }
  }
]
