import Layout from '@/layout'

const notificationManagementRouter =
  {
    path: '',
    component: Layout,
    redirect: '/notificationManagement',
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: '/notificationManagement',
        component: () => import('@/views/notificationManagement'),
        name: 'notificationManagement',
        meta: {
          title: '公告管理',
          roles: ['admin']
        }
      }
    ]
  }

export default notificationManagementRouter
