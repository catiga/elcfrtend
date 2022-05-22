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
      path: "task/loadflow/list",
      component: require("@/views/ProjectMgr/loadflow/list").default,
      name: "task_loadflow_list",
      meta: { title: "潮流计算", noCache: true },
    },
    {
      path: "task/station/list",
      component: require("@/views/ProjectMgr/station/list").default,
      name: "task_station_list",
      meta: { title: "站外进线拓扑结构", noCache: true },
    },
    {
      path: "task/station/add",
      component: require("@/views/ProjectMgr/station/add").default,
      name: "task_station_add",
      meta: { title: "站外进线拓扑结构", noCache: true },
    },
    {
      path: "task/risk/list",
      component: require("@/views/ProjectMgr/risk/list").default,
      name: "task_risk_list",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "task/risk/add",
      component: require("@/views/ProjectMgr/risk/add").default,
      name: "task_risk_list",
      meta: { title: "风险评估", noCache: true },
    },
    {
      path: "task/weak/list",
      component: require("@/views/ProjectMgr/weak/list").default,
      name: "task_weak_list",
      meta: { title: "薄弱环节分析", noCache: true },
    },
    {
      path: "task/weak/add",
      component: require("@/views/ProjectMgr/weak/add").default,
      name: "task_weak_list",
      meta: { title: "薄弱环节分析添加", noCache: true },
    },
    {
      path: "task/overhaul/list",
      component: require("@/views/ProjectMgr/overhaul/list").default,
      name: "task_overhaul_list",
      meta: { title: "检修方案智能决策", noCache: true },
    },
  ],
};

export default reportRouter
