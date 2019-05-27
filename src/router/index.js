import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
/* Router Modules */
import customerManagementRouter from './modules/demo/customerManagement'
import searchRouter from './modules/demo/search'
import workOrderManagementRouter from './modules/workOrderManagement'
import qualityAssuranceManagementRouter from './modules/qualityAssuranceManagement'
import chartRouter from './modules/demo/chart'
import systemRouter from './modules/demo/system/system'

import messageManagementRouter from './modules/messageManagement'

Vue.use(Router)

// 静态路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
        hidden: true
      }
    ]
  }
]

// 动态路由
export const asyncRoutes = [
  customerManagementRouter,
  searchRouter,
  workOrderManagementRouter,
  qualityAssuranceManagementRouter,
  chartRouter,
  systemRouter,

  messageManagementRouter,
  // 404 必须在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
