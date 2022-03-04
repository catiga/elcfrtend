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
      path: 'style/list',
      component: () => import('@/views/ProjectMgr/list'),
      name: 'style_list',
      meta: { title: '风格管理', noCache: true }
    }
  ]
}

export default reportRouter
