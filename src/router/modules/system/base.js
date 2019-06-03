import AppMain from '@/layout/components/AppMain'

const baseRouter = {
  path: 'base',
  component: AppMain,
  redirect: '/system/base/dictionary',
  name: 'base',
  meta: {
    title: '基础配置'
  },
  children: [
    {
      path: 'dictionary ',
      component: () => import('@/views/system/base/dictionary'),
      name: 'dictionary',
      meta: {
        title: '数据字典',
        roles: ['admin']
      }
    },
    {
      path: 'workdays ',
      component: () => import('@/views/system/base/workdays'),
      name: 'workdays',
      meta: {
        title: '工作日设置',
        roles: ['admin']
      }
    }
  ]
}
export default baseRouter
