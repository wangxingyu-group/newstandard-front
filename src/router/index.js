import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
/* Router Modules */
import customerManagementRouter from './modules/customerManagement'
import integratedQueryRouter from './modules/integratedQuery'
import workOrderManagementRouter from './modules/workOrderManagement'
import qualityAssuranceManagementRouter from './modules/qualityAssuranceManagement'
import chartRouter from './modules/chart'
import systemRouter from './modules/system/system'

import messageManagementRouter from './modules/messageManagement'
import intelligentQuestionsRouter from './modules/intelligentQuestions'
import newReVisitRouter from './modules/newReVisit'
import claimsRevisitRouter from './modules/claimsRevisit'
import underwritingRevisitRouter from './modules/underwritingRevisit'
import customerServiceRevisitRouter from './modules/customerServiceRevisit'
import otherRevisitRouter from './modules/otherRevisit'
import backlogRouter from './modules/backlog'
import activitiRouter from './modules/activiti'
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
  integratedQueryRouter,
  workOrderManagementRouter,
  qualityAssuranceManagementRouter,
  chartRouter,
  systemRouter,
  messageManagementRouter,
  intelligentQuestionsRouter,
  newReVisitRouter,
  claimsRevisitRouter,
  underwritingRevisitRouter,
  customerServiceRevisitRouter,
  otherRevisitRouter,
  backlogRouter,
  activitiRouter,
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
