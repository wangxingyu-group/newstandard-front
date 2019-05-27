import Layout from '@/layout'
import permission from './permission'
import base from './base'
import flow from './flow'
import announce from './announce'
const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/permission/group',
  name: 'system',
  meta: {
    title: '系统设置',
    icon: 'documentation'
  },
  children: [
    permission,
    base,
    flow,
    announce
  ]
}
export default systemRouter
