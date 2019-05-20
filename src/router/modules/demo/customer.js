import Layout from '@/layout'

const customerRouter =
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/preCustomer',
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'preCustomer',
        component: () => import('@/views/demo/customer/preCustomer'),
        name: 'preCustomer',
        meta: {
          title: '准客户',
          roles: ['admin']
        }
      },
      {
        path: 'agent',
        component: () => import('@/views/demo/customer/agent'),
        name: 'agent',
        meta: {
          title: '代理人',
          roles: ['admin']
        }
      }
    ]
  }

export default customerRouter
