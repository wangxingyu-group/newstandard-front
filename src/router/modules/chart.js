import Layout from '@/layout'

const chartRouter =
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/chart1',
    name: 'chart',
    meta: {
      title: '报表',
      icon: 'fa fa-bar-chart'
    },
    children: [
      // {
      //       //   path: 'chart1',
      //       //   component: () => import('@/views/chart/chart1'),
      //       //   name: 'chart1',
      //       //   meta: {
      //       //     title: '保监服务指标',
      //       //     roles: ['admin']
      //       //   }
      //       // },
      {
        path: 'chart2',
        component: () => import('@/views/chart/chart2'),
        name: 'chart2',
        meta: {
          title: '服务单统计表',
          roles: ['admin']
        }
      },
      {
        path: 'chart3',
        component: () => import('@/views/chart/chart3'),
        name: 'chart3',
        meta: {
          title: '短信发送统计',
          roles: ['admin']
        }
      },
      {
        path: 'chart4',
        component: () => import('@/views/chart/chart4'),
        name: 'chart4',
        meta: {
          title: '质检统计报表',
          roles: ['admin']
        }
      },
      {
        path: 'chart5',
        component: () => import('@/views/chart/chart5'),
        name: 'chart5',
        meta: {
          title: '坐席服务明细',
          roles: ['admin']
        }
      },
      {
        path: 'chart6',
        component: () => import('@/views/chart/chart6'),
        name: 'chart6',
        meta: {
          title: 'IVR呼入服务明细',
          roles: ['admin']
        }
      },
      {
        path: 'chart7',
        component: () => import('@/views/chart/chart7'),
        name: 'chart7',
        meta: {
          title: '呼出服务明细',
          roles: ['admin']
        }
      },
      {
        path: 'chart8',
        component: () => import('@/views/chart/chart8'),
        name: 'chart8',
        meta: {
          title: '呼入服务明细',
          roles: ['admin']
        }
      },
      {
        path: 'chart9',
        component: () => import('@/views/chart/chart9'),
        name: 'chart9',
        meta: {
          title: '坐席组服务明细',
          roles: ['admin']
        }
      },
      {
        path: 'chart10',
        component: () => import('@/views/chart/chart10'),
        name: 'chart10',
        meta: {
          title: '呼出汇总',
          roles: ['admin']
        }
      },
      {
        path: 'chart11',
        component: () => import('@/views/chart/chart11'),
        name: 'chart11',
        meta: {
          title: '系统数据统计',
          roles: ['admin']
        }
      },
      {
        path: 'chart12',
        component: () => import('@/views/chart/chart12'),
        name: 'chart12',
        meta: {
          title: '导入数据统计',
          roles: ['admin']
        }
      },
      {
        path: 'chart13',
        component: () => import('@/views/chart/chart13'),
        name: 'chart13',
        meta: {
          title: '坐席组图形报表',
          roles: ['admin']
        }
      },
      {
        path: 'chart14',
        component: () => import('@/views/chart/chart14'),
        name: 'chart14',
        meta: {
          title: '坐席图形报表',
          roles: ['admin']
        }
      },
      {
        path: 'chart15',
        component: () => import('@/views/chart/chart15'),
        name: 'chart15',
        meta: {
          title: '评分记录',
          roles: ['admin']
        }
      },
      {
        path: 'chart16',
        component: () => import('@/views/chart/chart16'),
        name: 'chart16',
        meta: {
          title: 'DID报表',
          roles: ['admin']
        }
      },
      {
        path: 'chart17',
        component: () => import('@/views/chart/chart17'),
        name: 'chart17',
        meta: {
          title: '地区分析报表',
          roles: ['admin']
        }
      }
    ]
  }

export default chartRouter
