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
      // {
      //   path: '/knowledgeBase/major',
      //   component: () => import('@/views/knowledgeBase/major'),
      //   name: 'Major',
      //   meta: {
      //     title: '知识库主页',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'registration',
        component: () => import('@/views/knowledgeBase/knowledgeBase'),
        name: 'registration',
        meta: {
          title: '知识库主页',
          roles: ['admin']
        }
      },
      {
        path: '/knowledgeBase/fullTextSearch',
        component: () => import('@/views/knowledgeBase/fullTextSearch'),
        name: 'FullTextSearch',
        meta: {
          title: '全文检索',
          roles: ['admin']
        }
      },
    ]
  }

export default knowledgeBase
