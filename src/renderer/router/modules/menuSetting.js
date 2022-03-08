/** When your routing table is too long, you can split it into small modules**/


const reportRouter = {
  path: '/menuSetting',
  redirect: 'noRedirect',
  name: 'menuSetting',
  component: require('@/components/Layout/Layout').default,
  meta: {
    title: '系统设置'
  },
  children: [
    {
      path: 'ms/elemdata/benchmark',
      component: () => import('@/views/MenuSetting/elemdata/benchmark'),
      name: 'ms_elemdata_benchmark',
      meta: { title: '基准值修正', noCache: true }
    },
    {
      path: 'ms/elemdata/station',
      component: () => import('@/views/MenuSetting/elemdata/station'),
      name: 'ms_elemdata_station',
      meta: { title: '厂站数据修正', noCache: true },
      children : [
        {
          path: 'stat',
          component: () => import('@/views/MenuSetting/elemdata/child/stat'),
          name: 'station_stat',
          meta: { title:'厂站' }
        },
        {
          path: 'moline',
          component: () => import('@/views/MenuSetting/elemdata/child/moline'),
          name: 'station_moline',
          meta: { title:'母线' }
        },
        {
          path: 'acline',
          component: () => import('@/views/MenuSetting/elemdata/child/acline'),
          name: 'station_acline',
          meta: { title:'交流线' }
        },
        {
          path: 'paracap',
          component: () => import('@/views/MenuSetting/elemdata/child/paracap'),
          name: 'station_paracap',
          meta: { title:'并联电容电抗' }
        },
        {
          path: 'transformer',
          component: () => import('@/views/MenuSetting/elemdata/child/transformer'),
          name: 'station_transformer',
          meta: { title:'变压器' }
        },
        {
          path: 'load',
          component: () => import('@/views/MenuSetting/elemdata/child/load'),
          name: 'station_load',
          meta: { title:'负荷' }
        },
      ]
    }
  ]
}

export default reportRouter
