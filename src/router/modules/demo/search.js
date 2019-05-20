import Layout from '@/layout'

const searchRouter = {
  path: '/search',
  component: Layout,
  redirect: '/search/personalInsurance',
  name: 'search',
  meta: {
    title: '综合查询',
    icon: 'search'
  },
  children: [
    {
      path: 'personalInsurance ',
      component: () => import('@/views/demo/search/personalInsurance'),
      name: 'personalInsurance',
      meta: {
        title: '个人保单查询',
        roles: ['admin']
      }
    },
    {
      path: 'groupInsurance ',
      component: () => import('@/views/demo/search/groupInsurance'),
      name: 'groupInsurance',
      meta: {
        title: '团险查询',
        roles: ['admin']
      }
    },
    {
      path: 'whiteList ',
      component: () => import('@/views/demo/search/whiteList'),
      name: 'whiteList',
      meta: {
        title: '白名单审核结果查询',
        roles: ['admin']
      }
    },
    {
      path: 'electroDocument ',
      component: () => import('@/views/demo/search/electroDocument'),
      name: 'electroDocument',
      meta: {
        title: '单证下载',
        roles: ['admin']
      }
    }
  ]
}
export default searchRouter
