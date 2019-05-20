import AppMain from '@/layout/components/AppMain'

const permissionRouter = {
  path: 'permission',
  component: AppMain,
  redirect: '/system/permission/group',
  name: 'permission',
  meta: {
    title: '权限管理'
  },
  children: [
    {
      path: 'group ',
      component: () => import('@/views/demo/system/permission/group'),
      name: 'group',
      meta: {
        title: '机构信息管理',
        roles: ['admin']
      }
    },
    {
      path: 'user ',
      component: () => import('@/views/demo/system/permission/user'),
      name: 'user',
      meta: {
        title: '用户管理',
        roles: ['admin']
      }
    },
    {
      path: 'rule ',
      component: () => import('@/views/demo/system/permission/rule'),
      name: 'rule',
      meta: {
        title: '角色管理',
        roles: ['admin']
      }
    },
    {
      path: 'menu ',
      component: () => import('@/views/demo/system/permission/menu'),
      name: 'menu',
      meta: {
        title: '菜单管理',
        roles: ['admin']
      }
    },
    {
      path: 'resource ',
      component: () => import('@/views/demo/system/permission/resource'),
      name: 'resource',
      meta: {
        title: '资源管理',
        roles: ['admin']
      }
    }
  ]
}
export default permissionRouter
