import Layout from '@/layout'

const emailManagementRouter =
  {
    path: '/emailManagement',
    component: Layout,
    redirect: '/emailManagement/send',
    name: 'emailManagement',
    meta: {
      title: '邮件管理',
      icon: 'fa fa-envelope-o'
    },
    children: [
      {
        path: 'send',
        component: () => import('@/views/emailManagement/send'),
        name: 'send',
        meta: {
          title: '发送邮件',
          roles: ['admin']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/emailManagement/history'),
        name: 'history',
        meta: {
          title: '已发邮件',
          roles: ['admin']
        }
      },
      {
        path: 'template',
        component: () => import('@/views/emailManagement/template'),
        name: 'template',
        meta: {
          title: '邮件模版',
          roles: ['admin']
        }
      }
    ]
  }

export default emailManagementRouter
