import Layout from '@/layout'
import permission from './permission'
import base from './base'
import flow from './flow'

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
    flow
  ]
}
export default systemRouter
