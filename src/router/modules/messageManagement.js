import Layout from '@/layout'

const messageManagementRouter =
  {
    path: '/messageManagement',
    component: Layout,
    redirect: '/messageManagement/send',
    name: 'messageManagement',
    meta: {
      title: '短信管理',
      icon: 'fa fa-mobile-phone fa-lg'
    },
    children: [
      {
        path: 'send',
        component: () => import('@/views/messageManagement/send'),
        name: 'send',
        meta: {
          title: '发送短信',
          roles: ['admin']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/messageManagement/history'),
        name: 'history',
        meta: {
          title: '已发短信',
          roles: ['admin']
        }
      },
      {
        path: 'template',
        component: () => import('@/views/messageManagement/template'),
        name: 'template',
        meta: {
          title: '短信模版',
          roles: ['admin']
        }
      }
    ]
  }

export default messageManagementRouter
