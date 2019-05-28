import Layout from '@/layout'

const intelligentQuestionsRouter =
  {
    path: '/intelligentQuestions',
    component: Layout,
    redirect: '/intelligentQuestions/question',
    name: 'intelligentQuestion',
    meta: {
      title: '智能题库',
      icon: 'education'
    },
    children: [
      {
        path: 'question',
        component: () => import('@/views/intelligentQuestions/question'),
        name: 'question',
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
        path: 'categoriesSettings',
        component: () => import('@/views/intelligentQuestions/categoriesSettings'),
        name: 'categoriesSettings',
        meta: {
          title: '险种设置',
          roles: ['admin']
        }
      },
      {
        path: 'productSettings',
        component: () => import('@/views/intelligentQuestions/productSettings'),
        name: 'productSettings',
        meta: {
          title: '险种设置',
          roles: ['admin']
        }
      }
    ]
  }

export default intelligentQuestionsRouter
