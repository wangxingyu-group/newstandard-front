import Layout from '@/layout'

const otherRevisitRouter =
  {
    path: '/otherRevisit',
    component: Layout,
    redirect: '/otherRevisit/taskPool',
    name: 'otherRevisit',
    meta: {
      title: '服务回访',
      icon: 'edit'
    },
    children: [
      {
        path: 'taskPool',
        component: () => import('@/views/otherRevisit/taskPool'),
        name: 'taskPool',
        meta: {
          title: '任务池',
          roles: ['admin']
        }
      },
      {
        path: 'callOutLog',
        component: () => import('@/views/otherRevisit/callOutLog'),
        name: 'callOutLog',
        meta: {
          title: '外呼日志',
          roles: ['admin']
        }
      },
      {
        path: 'quickSearch',
        component: () => import('@/views/otherRevisit/quickSearch'),
        name: 'quickSearch',
        meta: {
          title: '快速查找',
          roles: ['admin']
        }
      }
    ]
  }

export default otherRevisitRouter
