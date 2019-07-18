import Layout from '@/layout'

const backlogRouter =
  {
    path: '/backlog',
    component: Layout,
    redirect: '/backlog/taskPool',
    name: 'backlog',
    meta: {
      title: '待办事项',
      icon: 'fa fa-list-alt'
    },
    children: [
      {
        path: 'taskPool',
        component: () => import('@/views/backlog/taskPool'),
        name: 'taskPool',
        meta: {
          title: '待办任务池',
          roles: ['admin']
        }
      },
      {
        path: 'newSettingList',
        component: () => import('@/views/backlog/newSettingList'),
        name: 'newSettingList',
        meta: {
          title: '新增需配置清单',
          roles: ['admin']
        }
      }
    ]
  }
export default backlogRouter
