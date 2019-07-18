import Layout from '@/layout'

const systemRealTimeMessageRouter =
  {
    path: '/systemRealTimeMessage',
    component: Layout,
    redirect: '/systemRealTimeMessage/onlineSeating',
    name: 'systemRealTimeMessage',
    meta: {
      title: '系统实时信息',
      icon: 'fa fa-tachometer'
    },
    children: [
      {
        path: 'onlineSeating',
        component: () => import('@/views/systemRealTimeMessage/onlineSeating.vue'),
        name: 'systemRealTimeMessageOnlineSeating',
        meta: {
          title: '在线坐席',
          roles: ['admin']
        }
      },
      {
        path: 'onlineUser',
        component: () => import('@/views/systemRealTimeMessage/onlineUser.vue'),
        name: 'systemRealTimeMessageOnlineUser',
        meta: {
          title: '在线用户',
          roles: ['admin']
        }
      },
      {
        path: 'seatingGroupMonitoring ',
        component: () => import('@/views/systemRealTimeMessage/seatingGroupMonitoring.vue'),
        name: 'systemRealTimeMessageSeatingGroupMonitoring',
        meta: {
          title: '坐席组监控',
          roles: ['admin']
        }
      },
      {
        path: 'systemUsageInformation',
        component: () => import('@/views/systemRealTimeMessage/systemUsageInformation.vue'),
        name: 'systemRealTimeMessageSystemUsageInformation',
        meta: {
          title: '系统使用信息',
          roles: ['admin']
        }
      },
      {
        path: 'systemInformation',
        component: () => import('@/views/systemRealTimeMessage/systemInformation.vue'),
        name: 'systemRealTimeMessageSystemInformation',
        meta: {
          title: '系统信息',
          roles: ['admin']
        }
      },
      {
        path: 'realtimeUseOfRelay ',
        component: () => import('@/views/systemRealTimeMessage/realtimeUseOfRelay.vue'),
        name: 'systemRealTimeMessageRealtimeUseOfRelay',
        meta: {
          title: '中继实时使用情况',
          roles: ['admin']
        }
      },
      {
        path: 'callMonitoring',
        component: () => import('@/views/systemRealTimeMessage/callMonitoring.vue'),
        name: '/systemRealTimeMessageCallMonitoring',
        meta: {
          title: '通话监控',
          roles: ['admin']
        }
      },
      {
        path: 'presence',
        component: () => import('@/views/systemRealTimeMessage/presence.vue'),
        name: 'systemRealTimeMessagePresence',
        meta: {
          title: '坐席状态',
          roles: ['admin']
        }
      },
      {
        path: 'callPresence',
        component: () => import('@/views/systemRealTimeMessage/callPresence.vue'),
        name: 'systemRealTimeMessageCallPresence',
        meta: {
          title: '通话状态',
          roles: ['admin']
        }
      }
    ]
  }

export default systemRealTimeMessageRouter
