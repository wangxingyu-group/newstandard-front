import Layout from '@/layout'

const customerRouter =
  {
    path: '/customerManagement',
    component: Layout,
    redirect: '/customerManagement/preCustomer',
    name: 'customerManagement',
    meta: {
      title: '客户管理',
      icon: 'fa fa-users'
    },
    children: [
      {
        path: 'preCustomer',
        component: () => import('@/views/customerManagement/preCustomer'),
        name: 'preCustomer',
        meta: {
          title: '潜在客户',
          roles: ['admin']
        }
      },
      {
        path: 'customer',
        component: () => import('@/views/customerManagement/customer'),
        name: 'customer',
        meta: {
          title: '正常客户',
          roles: ['admin']
        }
      },
      {
        path: 'customer/details',
        component: () => import('@/views/customerManagement/customer/details'),
        name: 'customerDetails',
        hidden: true,
        meta: {
          title: '客户详情',
          roles: ['admin']
        }
      },
      {
        path: 'agent',
        component: () => import('@/views/customerManagement/agent'),
        name: 'agent',
        meta: {
          title: '衰退客户',
          roles: ['admin']
        }
      },
      {
        path: 'agent/details',
        component: () => import('@/views/customerManagement/agent/details'),
        name: 'agentDetails',
        hidden: true,
        meta: {
          title: '客户详情',
          roles: ['admin']
        }
      },
      {
        path: 'custom2',
        component: () => import('@/views/customerManagement/customer2'),
        name: 'custom2',
        meta: {
          title: '流失客户',
          roles: ['admin']
        }
      },
      {
        path: 'custom2/details',
        component: () => import('@/views/customerManagement/customer2/details'),
        name: 'custom2Details',
        hidden: true,
        meta: {
          title: '客户详情',
          roles: ['admin']
        }
      }
    ]
  }

export default customerRouter
