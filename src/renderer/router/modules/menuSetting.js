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
    }
  ]
}

export default reportRouter
