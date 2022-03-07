/** When your routing table is too long, you can split it into small modules**/


const reportRouter = {
  path: '/projectMgr',
  redirect: 'noRedirect',
  name: 'projectMgr',
  component: require('@/components/Layout/Layout').default,
  meta: {
    title: '工程管理'
  },
  children: [
    {
      path: 'p/list',
      component: () => import('@/views/ProjectMgr/list'),
      name: 'p_list',
      meta: { title: '工程列表', noCache: true }
    },
    {
      path: 'loadflow/list',
      component: () => import('@/views/ProjectMgr/loadflow/list'),
      name: 'loadflow_list',
      meta: { title: '潮流计算', noCache: true }
    }
  ]
}

export default reportRouter
