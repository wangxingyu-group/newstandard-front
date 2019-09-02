import Layout from '@/layout'

const verbalTrick =
  {
    path: '/verbalTrick',
    component: Layout,
    redirect: '/verbalTrick/verbalTrick',
    name: 'knowledge',
    meta: {
      title: '话术库',
      icon: 'fa fa-comment-o'
    },
    children: [
      {
        path: 'registration',
        component: () => import('@/views/verbalTrick/verbalTrick'),
        name: 'registration',
        meta: {
          title: '话术库',
          roles: ['admin']
        }
      }
    ]
  }

export default verbalTrick
