import Layout from '@/layout'

const intelligentQuestionsRouter =
  {
    path: '/intelligentQuestions',
    component: Layout,
    redirect: '/intelligentQuestions/question',
    name: 'intelligentQuestion',
    meta: {
      title: '智能题库',
      icon: 'fa fa-book'
    },
    children: [
      {
        path: 'customerServiceQuestion',
        component: () => import('@/views/intelligentQuestions/question'),
        name: 'customerServiceQuestion',
        meta: {
          title: '问题管理',
          roles: ['admin']
        }
      },
      {
        path: 'questionnaire',
        component: () => import('@/views/intelligentQuestions/questionnaire'),
        name: 'questionnaire',
        meta: {
          title: '问卷管理',
          roles: ['admin']
        }
      },
      {
        path: 'riskSettings',
        component: () => import('@/views/intelligentQuestions/riskSettings'),
        name: 'riskSettings',
        meta: {
          title: '产品设置',
          roles: ['admin']
        }
      },
      {
        path: 'FAQSettings',
        component: () => import('@/views/intelligentQuestions/FAQSettings'),
        name: 'FAQSettings',
        meta: {
          title: '常见问题配置',
          roles: ['admin']
        }
      }
    ]
  }

export default intelligentQuestionsRouter
