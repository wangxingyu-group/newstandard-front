import AppMain from '@/layout/components/AppMain'

const announceRouter = {
  path: 'announce',
  component: AppMain,
  redirect: '/system/announce',
  name: 'announceTitle',
  meta: {
    title: '公告板管理'
  },
  children: [
    {
      path: 'announce',
      component: () => import('@/views/demo/system/announce/group'),
      name: 'announce',
      meta: {
        title: '公告信息管理',
        roles: ['admin']
      }
    }
  ]
}
export default announceRouter
