import Layout from '@/layout'

const customerRouter =
  {
    path: '/customerManagement',
    component: Layout,
    redirect: '/customerManagement/preCustomer',
    name: 'customerManagement',
    meta: {
      title: '客户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'preCustomer',
        component: () => import('@/views/customerManagement/preCustomer'),
        name: 'preCustomer',
        meta: {
          title: '准客户',
          roles: ['admin']
        }
      },
      {
        path: 'customer',
        component: () => import('@/views/customerManagement/customer'),
        name: 'customer',
        meta: {
          title: '客户',
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
          title: '代理人',
          roles: ['admin']
        }
      },
      {
        path: 'agent/details',
        component: () => import('@/views/customerManagement/agent/details'),
        name: 'agentDetails',
        hidden: true,
        meta: {
          title: '代理人详情',
          roles: ['admin']
        }
      }
    ]
  }

export default customerRouter
