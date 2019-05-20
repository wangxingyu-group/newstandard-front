import Layout from '@/layout'

const messageRouter =
  {
    path: '/message',
    component: Layout,
    redirect: '/message/send',
    name: 'message',
    meta: {
      title: '短信管理',
      icon: 'message'
    },
    children: [
      {
        path: 'send',
        component: () => import('@/views/demo/message/send'),
        name: 'send',
        meta: {
          title: '发送短信',
          roles: ['admin']
        }
      },
      {
        path: 'modelManagement',
        component: () => import('@/views/demo/message/modelManagement'),
        name: 'modelManagement',
        meta: {
          title: '范文管理',
          roles: ['admin']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/demo/message/history'),
        name: 'history',
        meta: {
          title: '已发短信',
          roles: ['admin']
        }
      }
    ]
  }

export default messageRouter
