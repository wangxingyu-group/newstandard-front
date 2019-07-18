import Layout from '@/layout'

const knowledgeBase =
  {
    path: '/knowledgeBase',
    component: Layout,
    redirect: '/knowledgeBase/knowledgeBase',
    name: 'knowledge',
    meta: {
      title: '知识库',
      icon: 'fa fa-graduation-cap'
    },
    children: [
      {
        path: 'registration',
        component: () => import('@/views/knowledgeBase/knowledgeBase'),
        name: 'registration',
        meta: {
          title: '知识库',
          roles: ['admin']
        }
      }
    ]
  }

export default knowledgeBase
