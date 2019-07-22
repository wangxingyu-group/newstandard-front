import Layout from '@/layout'

const workOrderManagementRouter =
  {
    path: '/workOrderManagement',
    component: Layout,
    redirect: '/workOrderManagement/registration',
    name: 'workOrderManagement',
    meta: {
      title: '工单管理',
      icon: 'fa fa-list-ul'
    },
    children: [
      {
        path: 'registration',
        component: () => import('@/views/workOrderManagement/registration'),
        name: 'registration',
        meta: {
          title: '工单登记',
          roles: ['admin']
        }
      },
      {
        path: 'workOrder',
        component: () => import('@/views/workOrderManagement/workOrder'),
        name: 'workOrder',
        meta: {
          title: '工单管理',
          roles: ['admin']
        }
      },
      {
        path: 'orderSettings',
        component: () => import('@/views/workOrderManagement/orderSettings'),
        name: 'orderSettings',
        meta: {
          title: '工单设置',
          roles: ['admin']
        }
      },
      {
        path: 'orderTransfer',
        component: () => import('@/views/workOrderManagement/orderTransfer'),
        name: 'orderTransfer',
        meta: {
          title: '转办单管理',
          roles: ['admin']
        }
      },
      {
        path: 'cancellation ',
        component: () => import('@/views/workOrderManagement/cancellation'),
        name: 'cancellation',
        meta: {
          title: '服务单退回',
          roles: ['admin']
        }
      },
      {
        path: 'callInTransfer',
        component: () => import('@/views/workOrderManagement/callInTransfer'),
        name: 'callInTransfer',
        meta: {
          title: '呼入业务转办任务',
          roles: ['admin']
        }
      }
    ]
  }

export default workOrderManagementRouter
