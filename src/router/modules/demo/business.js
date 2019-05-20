import Layout from '@/layout'

const businessRouter = {
  path: '/business',
  component: Layout,
  redirect: '/business/registration',
  name: 'business',
  meta: {
    title: '业务受理',
    icon: 'edit'
  },
  children: [
    {
      path: 'registration ',
      component: () => import('@/views/demo/business/registration'),
      name: 'registration',
      meta: {
        title: '服务单登记',
        roles: ['admin']
      }
    },
    {
      path: 'management ',
      component: () => import('@/views/demo/business/management'),
      name: 'management',
      meta: {
        title: '服务单管理',
        roles: ['admin']
      }
    },
    {
      path: 'setDetails ',
      component: () => import('@/views/demo/business/setDetails'),
      name: 'setDetails',
      meta: {
        title: '服务项目明细设置',
        roles: ['admin']
      }
    },
    {
      path: 'transferal ',
      component: () => import('@/views/demo/business/transferal'),
      name: 'transferal',
      meta: {
        title: '转办单管理(业务管理岗)',
        roles: ['admin']
      }
    },
    {
      path: 'cancellation ',
      component: () => import('@/views/demo/business/cancellation'),
      name: 'cancellation',
      meta: {
        title: '服务单退回',
        roles: ['admin']
      }
    },
    {
      path: 'callTransferal',
      component: () => import('@/views/demo/business/callTransferal'),
      name: 'callTransferal',
      meta: {
        title: '呼入业务转办任务',
        roles: ['admin']
      }
    }
  ]
}
export default businessRouter
