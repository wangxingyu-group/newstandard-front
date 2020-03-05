import Layout from '@/layout'

const qualityAssuranceManagementRouter =
  {
    path: '/qualityAssuranceManagement',
    component: Layout,
    redirect: '/qualityAssuranceManagement/ruleManagement',
    name: 'qualityAssuranceManagement',
    meta: {
      title: '质检管理',
      icon: 'fa fa-calendar-check-o'
    },
    children: [
      {
        path: 'ruleManagement',
        component: () => import('@/views/qualityAssuranceManagement/ruleManagement'),
        name: 'ruleManagement',
        meta: {
          title: '规则管理',
          roles: ['admin']
        }
      },
      {
        path: 'qualityAssurance',
        component: () => import('@/views/qualityAssuranceManagement/qualityAssurance'),
        name: 'qualityAssurance',
        meta: {
          title: '质检管理',
          roles: ['admin']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/qualityAssuranceManagement/history'),
        name: 'searchRecord',
        meta: {
          title: '质检复核',
          roles: ['admin']
        }
      },
      {
        path: 'queryQualityAssurance',
        component: () => import('@/views/qualityAssuranceManagement/queryQualityAssurance'),
        name: 'queryQualityAssurance',
        meta: {
          title: '质检查询',
          roles: ['admin']
        }
      },
      {
        path: 'queryAssuranceListen',
        component: () => import('@/views/qualityAssuranceManagement/qualityAssurance/listen.vue'),
        name: 'queryAssuranceListen',
        hidden: true,
        meta: {
          title: '质检调听',
          roles: ['admin']
        }
      },
      {
        path: 'qualityComplain',
        component: () => import('@/views/qualityAssuranceManagement/qualityComplain'),
        name: 'queryQualityAssurance',
        meta: {
          title: '质检申诉',
          roles: ['admin']
        }
      }/*,
      {
        path: 'voiceToText',
        component: () => import('@/views/qualityAssuranceManagement/voiceToText'),
        name: 'voiceToText',
        meta: {
          title: '语音转文本质检',
          roles: ['admin']
        }
      }*/
    ]
  }

export default qualityAssuranceManagementRouter
