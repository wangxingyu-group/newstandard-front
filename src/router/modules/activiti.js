import Layout from '@/layout'

const activitiRouter =
  {
    path: '/activiti',
    component: Layout,
    redirect: '/activiti/activitiModel',
    name: 'activiti',
    meta: {
      title: '流程管理',
      icon: 'edit'
    },
    children: [
      {
        path: 'activitiModel',
        component: () => import('@/views/activiti/activitiModel'),
        name: 'activitiModel',
        meta: {
          title: '流程管理',
          roles: ['admin']
        }
      }
    ]
  }
export default activitiRouter
