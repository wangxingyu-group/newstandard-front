import Layout from '@/layout'

const chartRouter =
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/chart1',
    name: 'chart',
    meta: {
      title: '报表',
      icon: 'peoples'
    },
    children: [
      {
        path: 'chart1',
        component: () => import('@/views/demo/chart/chart1'),
        name: 'chart1',
        meta: {
          title: '保监服务指标',
          roles: ['admin']
        }
      },
      {
        path: 'chart2',
        component: () => import('@/views/demo/chart/chart2'),
        name: 'chart2',
        meta: {
          title: '服务单表表',
          roles: ['admin']
        }
      },
      {
        path: 'chart3',
        component: () => import('@/views/demo/chart/chart3'),
        name: 'chart3',
        meta: {
          title: '短信发送统计',
          roles: ['admin']
        }
      },
      {
        path: 'chart4',
        component: () => import('@/views/demo/chart/chart4'),
        name: 'chart4',
        meta: {
          title: '质检报表',
          roles: ['admin']
        }
      }
    ]
  }

export default chartRouter
