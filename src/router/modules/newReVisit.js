import Layout from '@/layout'

const newReVisitRouter =
  {
    path: '/newReVisit',
    component: Layout,
    redirect: '/newReVisit/distribution',
    name: 'newReVisit',
    meta: {
      title: '新单回访',
      icon: 'edit'
    },
    children: [
      {
        path: 'distribution',
        component: () => import('@/views/newReVisit/distribution'),
        name: 'distribution',
        meta: {
          title: '回访任务分配',
          roles: ['admin']
        }
      },
      {
        path: 'personalReVisit',
        component: () => import('@/views/newReVisit/personalReVisit'),
        name: 'personalReVisit',
        meta: {
          title: '私人回访任务',
          roles: ['admin']
        }
      }
    ]
  }

export default newReVisitRouter
