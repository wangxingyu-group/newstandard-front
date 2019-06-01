import Layout from '@/layout'

const searchRouter = {
  path: '/integratedQuery',
  component: Layout,
  redirect: '/integratedQuery/personalInsurance',
  name: 'search',
  meta: {
    title: '综合查询',
    icon: 'search'
  },
  children: [
    {
      path: 'personalInsurance',
      component: () => import('@/views/integratedQuery/personalInsurance'),
      name: 'personalInsurance',
      meta: {
        title: '个人保单查询',
        roles: ['admin']
      }
    },
    {
      path: 'personalInsurance/details',
      hidden: true,
      component: () => import('@/views/integratedQuery/personalInsurance/details'),
      name: 'personalInsurance/details',
      meta: {
        title: '个人保险详情',
        roles: ['admin']
      }
    },
    {
      path: 'groupInsurance',
      component: () => import('@/views/integratedQuery/groupInsurance'),
      name: 'groupInsurance',
      meta: {
        title: '团险查询',
        roles: ['admin']
      }
    },
    {
      path: 'whiteList',
      component: () => import('@/views/integratedQuery/whiteList'),
      name: 'whiteList',
      meta: {
        title: '白名单审核结果查询',
        roles: ['admin']
      }
    },
    {
      path: 'electroDocument',
      component: () => import('@/views/integratedQuery/electroDocument'),
      name: 'electroDocument',
      meta: {
        title: '单证下载',
        roles: ['admin']
      }
    }
  ]
}
export default searchRouter
