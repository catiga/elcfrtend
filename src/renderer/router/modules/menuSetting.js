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
          path: 'station_stat',
          component: () => import('@/views/MenuSetting/elemdata/child/stat'),
          name: 'station_stat',
          meta: { title:'厂站1' }
        },
        {
          path: 'station_stat2',
          component: () => import('@/views/MenuSetting/elemdata/child/stat2'),
          name: 'station_stat2',
          meta: { title:'厂站1' }
        },
      ]
    }
  ]
}

export default reportRouter
