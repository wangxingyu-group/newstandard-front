import Layout from '@/layout'
import permission from './permission'
import base from './base'
import announce from './notification'
const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/permission/group',
  name: 'system',
  meta: {
    title: '系统设置',
    icon: 'fa fa-cog'
  },
  children: [
    permission,
    base,
    announce
  ]
}
export default systemRouter
