import Layout from '@/layout'

const newReVisitRouter =
  {
    path: '/newReVisit',
    component: Layout,
    redirect: '/newReVisit/distribution',
    name: 'newReVisit',
    meta: {
      title: '新单回访',
      icon: 'edit'
    },
    children: [
      {
        path: 'distribution',
        component: () => import('@/views/newReVisit/distribution'),
        name: 'distribution',
        meta: {
          title: '回访任务分配',
          roles: ['admin']
        }
      },
      {
        path: 'personalReVisit',
        component: () => import('@/views/newReVisit/personalReVisit'),
        name: 'personalReVisit',
        meta: {
          title: '私人回访任务',
          roles: ['admin']
        }
      },
      {
        path: 'problemManagement',
        component: () => import('@/views/newReVisit/problemManagement'),
        name: 'problemManagement ',
        meta: {
          title: '问题件管理',
          roles: ['admin']
        }
      },
      {
        path: 'emailManagement',
        component: () => import('@/views/newReVisit/emailManagement'),
        name: 'emailManagement ',
        meta: {
          title: '信函件管理',
          roles: ['admin']
        }
      },
      {
        path: 'problemBranchHandle',
        component: () => import('@/views/newReVisit/problemBranchHandle'),
        name: 'problemBranchHandle ',
        meta: {
          title: '问题件分公司处理',
          roles: ['admin']
        }
      },
      {
        path: 'emailBranchHandle',
        component: () => import('@/views/newReVisit/emailBranchHandle'),
        name: 'emailBranchHandle ',
        meta: {
          title: '信函件分公司处理',
          roles: ['admin']
        }
      },
      {
        path: 'comprehensiveQuery',
        component: () => import('@/views/newReVisit/comprehensiveQuery'),
        name: 'comprehensiveQuery ',
        meta: {
          title: '综合查询',
          roles: ['admin']
        }
      },
      {
        path: 'revisitBlackListManagement',
        component: () => import('@/views/newReVisit/revisitBlackListManagement'),
        name: 'revisitBlackListManagement ',
        meta: {
          title: '回访黑名单管理',
          roles: ['admin']
        }
      },
      {
        path: 'revisitLogRecord',
        component: () => import('@/views/newReVisit/revisitLogRecord'),
        name: 'revisitLogRecord ',
        meta: {
          title: '回访日志记录',
          roles: ['admin']
        }
      },
      {
        path: 'taskGetRevisitData',
        component: () => import('@/views/newReVisit/taskGetRevisitData'),
        name: 'taskGetRevisitData ',
        meta: {
          title: '批处理获取回访数据',
          roles: ['admin']
        }
      },
      {
        path: 'ownershipInstitution',
        component: () => import('@/views/newReVisit/ownershipInstitution'),
        name: 'ownershipInstitution ',
        meta: {
          title: '归属机构',
          roles: ['admin']
        }
      },
      {
        path: 'channelConfig',
        component: () => import('@/views/newReVisit/channelConfig'),
        name: 'channelConfig ',
        meta: {
          title: '渠道配置',
          roles: ['admin']
        }
      },
      {
        path: 'revisitTaskMonitor',
        component: () => import('@/views/newReVisit/revisitTaskMonitor'),
        name: 'revisitTaskMonitor ',
        meta: {
          title: '回访任务监控',
          roles: ['admin']
        }
      },
      {
        path: 'successRate',
        component: () => import('@/views/newReVisit/successRate'),
        name: 'successRate ',
        meta: {
          title: '成功率统计',
          roles: ['admin']
        }
      }
    ]
  }

export default newReVisitRouter
