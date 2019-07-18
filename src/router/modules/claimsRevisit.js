import Layout from '@/layout'

const claimsRevisitRouter =
  {
    path: '/claimsRevisit',
    component: Layout,
    redirect: '/claimsRevisit/claimsCallOutTask',
    name: 'claimsRevisit',
    meta: {
      title: '理赔回访',
      icon: 'fa fa-microphone'
    },
    children: [
      {
        path: 'claimsCallOutTask',
        component: () => import('@/views/claimsRevisit/claimsCallOutTask'),
        name: 'claimsCallOutTask',
        meta: {
          title: '理赔外呼任务管理',
          roles: ['admin']
        }
      },
      {
        path: 'claimsCallOutResult',
        component: () => import('@/views/claimsRevisit/claimsCallOutResult'),
        name: 'claimsCallOutResult',
        meta: {
          title: '理赔外呼结果管理',
          roles: ['admin']
        }
      },
      {
        path: 'claimsCallOutChat',
        component: () => import('@/views/claimsRevisit/claimsCallOutChat'),
        name: 'claimsCallOutChat',
        meta: {
          title: '理赔外呼报表',
          roles: ['admin']
        }
      }
    ]
  }

export default claimsRevisitRouter
