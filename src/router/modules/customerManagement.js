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
        path: 'agent',
        component: () => import('@/views/customerManagement/agent'),
        name: 'agent',
        meta: {
          title: '代理人',
          roles: ['admin']
        }
      }
    ]
  }

export default customerRouter
