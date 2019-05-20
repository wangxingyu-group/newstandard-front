import AppMain from '@/layout/components/AppMain'

const flowRouter = {
  path: 'flow',
  component: AppMain,
  redirect: '/system/flow/workflow',
  name: 'flow',
  meta: {
    title: '工作流管理'
  },
  children: [
    {
      path: 'workflow ',
      component: () => import('@/views/demo/system/flow/workflow'),
      name: 'workflow',
      meta: {
        title: '工作流定义',
        roles: ['admin']
      }
    }
  ]
}
export default flowRouter
