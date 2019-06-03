import Layout from '@/layout'

const customerServiceRevisitRouter =
  {
    path: '/customerServiceRevisit',
    component: Layout,
    redirect: '/customerServiceRevisit/task',
    name: 'customerServiceRevisit',
    meta: {
      title: '保全回访',
      icon: 'edit'
    },
    children: [
      {
        path: 'task',
        component: () => import('@/views/customerServiceRevisit/task'),
        name: 'task',
        meta: {
          title: '任务查询',
          roles: ['admin']
        }
      },
      {
        path: 'record',
        component: () => import('@/views/customerServiceRevisit/record'),
        name: 'record',
        meta: {
          title: '记录查询',
          roles: ['admin']
        }
      },
      {
        path: 'customerServiceQuestion',
        component: () => import('@/views/customerServiceRevisit/customerServiceQuestion'),
        name: 'customerServiceQuestion',
        meta: {
          title: '问题管理',
          roles: ['admin']
        }
      },
      {
        path: 'customerServiceTransfer',
        component: () => import('@/views/customerServiceRevisit/customerServiceTransfer'),
        name: 'customerServiceTransfer',
        meta: {
          title: '保全转办任务池',
          roles: ['admin']
        }
      }
    ]
  }

export default customerServiceRevisitRouter
