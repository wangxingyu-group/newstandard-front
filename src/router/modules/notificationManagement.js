import Layout from '@/layout'

const notificationManagementRouter =
  {
    path: '/notificationManagement',
    component: Layout,
    redirect: '/notificationManagement/index',
    name: 'notificationManagement',
    meta: {
      title: '客户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/notificationManagement'),
        name: 'index',
        meta: {
          title: '公告管理',
          roles: ['admin']
        }
      }
    ]
  }

export default notificationManagementRouter
