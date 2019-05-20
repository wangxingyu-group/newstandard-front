import Layout from '@/layout'

const qualityAssuranceRouter =
  {
    path: '/qualityAssurance',
    component: Layout,
    redirect: '/qualityAssurance/ruleManagement',
    name: 'qualityAssurance',
    meta: {
      title: '质检管理',
      icon: 'component'
    },
    children: [
      {
        path: 'ruleManagement',
        component: () => import('@/views/demo/qualityAssurance/ruleManagement'),
        name: 'ruleManagement',
        meta: {
          title: '规则管理',
          roles: ['admin']
        }
      },
      {
        path: 'qaManagement',
        component: () => import('@/views/demo/qualityAssurance/qaManagement'),
        name: 'qaManagement',
        meta: {
          title: '质检管理',
          roles: ['admin']
        }
      },
      {
        path: 'searchRecord',
        component: () => import('@/views/demo/qualityAssurance/searchRecord'),
        name: 'searchRecord',
        meta: {
          title: '记录查询',
          roles: ['admin']
        }
      },
      {
        path: 'searchQA',
        component: () => import('@/views/demo/qualityAssurance/searchQA'),
        name: 'searchQA',
        meta: {
          title: '质检查询',
          roles: ['admin']
        }
      },
      {
        path: 'voiceToText',
        component: () => import('@/views/demo/qualityAssurance/voiceToText'),
        name: 'voiceToText',
        meta: {
          title: '语音转文本质检',
          roles: ['admin']
        }
      }
    ]
  }

export default qualityAssuranceRouter
