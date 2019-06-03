import Layout from '@/layout'

const underwritingRevisitRouter =
  {
    path: '/underwritingRevisit',
    component: Layout,
    redirect: '/underwritingRevisit/underwritingOutTask',
    name: 'underwritingRevisit',
    meta: {
      title: '核保回访',
      icon: 'edit'
    },
    children: [
      {
        path: 'underwritingOutTask',
        component: () => import('@/views/underwritingRevisit/underwritingOutTask'),
        name: 'underwritingOutTask',
        meta: {
          title: '核保外呼任务管理',
          roles: ['admin']
        }
      },
      {
        path: 'underwritingOutRecord',
        component: () => import('@/views/underwritingRevisit/underwritingOutRecord'),
        name: 'underwritingOutRecord',
        meta: {
          title: '核保外呼记录',
          roles: ['admin']
        }
      },
      {
        path: 'callOutSettings',
        component: () => import('@/views/underwritingRevisit/callOutSettings'),
        name: 'callOutSettings',
        meta: {
          title: '外呼内容配置管理',
          roles: ['admin']
        }
      }
    ]
  }

export default underwritingRevisitRouter
