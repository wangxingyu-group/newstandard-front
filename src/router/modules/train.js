import Layout from '@/layout'

const train =
  {
    path: '/train',
    component: Layout,
    redirect: '/train/trainPlan',
    name: 'train',
    meta: {
      title: '培训',
      icon: 'edit'
    },
    children: [
      {
        path: 'trainPlan',
        component: () => import('@/views/train/trainPlan'),
        name: 'trainPlan',
        meta: {
          title: '培训计划',
          roles: ['admin']
        }
      },
      {
        path: 'trainResource',
        component: () => import('@/views/train/trainResource'),
        name: 'trainResource',
        meta: {
          title: '培训资源',
          roles: ['admin']
        }
      },
      {
        path: 'teacherResource',
        component: () => import('@/views/train/teacherResource'),
        name: 'teacherResource',
        meta: {
          title: '教师资源',
          roles: ['admin']
        }
      },
      {
        path: 'institute',
        component: () => import('@/views/train/institute'),
        name: 'institute ',
        meta: {
          title: '学院资源',
          roles: ['admin']
        }
      }
    ]
  }

export default train
