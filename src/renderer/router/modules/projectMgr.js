/** When your routing table is too long, you can split it into small modules**/


const reportRouter = {
  path: "/projectMgr",
  redirect: "noRedirect",
  name: "projectMgr",
  component: require("@/components/Layout/Layout").default,
  meta: {
    title: "工程管理",
  },
  children: [
    {
      path: "p/list",
      component: () => import("@/views/ProjectMgr/list"),
      name: "p_list",
      meta: { title: "工程列表", noCache: true },
    },
    {
      path: "loadflow/list",
      component: () => import("@/views/ProjectMgr/loadflow/list"),
      name: "loadflow_list",
      meta: { title: "潮流计算", noCache: true },
    },
    {
      path: "loadflow/station",
      component: () => import("@/views/ProjectMgr/station"),
      name: "loadflow_station",
      meta: { title: "站外进线拓扑结构", noCache: true },
    },
    {
      path: "loadflow/risk",
      component: () => import("@/views/ProjectMgr/risk"),
      name: "loadflow_risk",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "loadflow/weak",
      component: () => import("@/views/ProjectMgr/weak"),
      name: "loadflow_weak",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "loadflow/overhaul",
      component: () => import("@/views/ProjectMgr/overhaul"),
      name: "loadflow_overhaul",
      meta: { title: "检修方案智能决策", noCache: true },
    },
  ],
};

export default reportRouter
