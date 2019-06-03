import AppMain from '@/layout/components/AppMain'

const announceRouter = {
  path: 'notification',
  component: AppMain,
  redirect: '/system/notification/index',
  name: 'notification',
  meta: {
    title: '公告板管理'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/system/notification'),
      name: 'index',
      meta: {
        title: '公告信息管理',
        roles: ['admin']
      }
    }
  ]
}
export default announceRouter
