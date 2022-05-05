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
      component: require("@/views/ProjectMgr/list").default,
      name: "p_list",
      meta: { title: "工程列表", noCache: true },
    },
    {
      path: "loadflow/list",
      component: require("@/views/ProjectMgr/loadflow/list").default,
      name: "loadflow_list",
      meta: { title: "潮流计算", noCache: true },
    },
    {
      path: "loadflow/station",
      component: require("@/views/ProjectMgr/station").default,
      name: "loadflow_station",
      meta: { title: "站外进线拓扑结构", noCache: true },
    },
    {
      path: "loadflow/risk",
      component: require("@/views/ProjectMgr/risk").default,
      name: "loadflow_risk",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "loadflow/weak",
      component: require("@/views/ProjectMgr/weak").default,
      name: "loadflow_weak",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "loadflow/overhaul",
      component: require("@/views/ProjectMgr/overhaul").default,
      name: "loadflow_overhaul",
      meta: { title: "检修方案智能决策", noCache: true },
    },
  ],
};

export default reportRouter
