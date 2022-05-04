/** When your routing table is too long, you can split it into small modules**/


const reportRouter = {
  path: "/menuSetting",
  redirect: "noRedirect",
  name: "menuSetting",
  component: require("@/components/Layout/Layout").default,
  meta: {
    title: "系统设置",
  },
  children: [
    {
      path: "ms/elemdata/benchmark",
      component: () => import("@/views/MenuSetting/elemdata/benchmark"),
      name: "ms_elemdata_benchmark",
      meta: { title: "基准值修正", noCache: true },
    },
    {
      path: "ms/elemdata/station",
      component: () => import("@/views/MenuSetting/elemdata/station"),
      name: "ms_elemdata_station",
      meta: { title: "厂站数据修正", noCache: true },
      children: [
        {
          path: "stat",
          component: () => import("@/views/MenuSetting/elemdata/child/stat"),
          name: "station_stat",
          meta: { title: "厂站" },
        },
        {
          path: "moline",
          component: () => import("@/views/MenuSetting/elemdata/child/moline"),
          name: "station_moline",
          meta: { title: "母线" },
        },
        {
          path: "acline",
          component: () => import("@/views/MenuSetting/elemdata/child/acline"),
          name: "station_acline",
          meta: { title: "交流线" },
        },
        {
          path: "_2transformer",
          component: () =>
            import("@/views/MenuSetting/elemdata/child/_2transformer"),
          name: "station__2transformer",
          meta: { title: "两绕组变压器" },
        },
        {
          path: "_3transformer",
          component: () =>
            import("@/views/MenuSetting/elemdata/child/_3transformer"),
          name: "station__3transformer",
          meta: { title: "三绕组变压器" },
        },
        {
          path: "dynamo",
          component: () => import("@/views/MenuSetting/elemdata/child/dynamo"),
          name: "station_dynamo",
          meta: { title: "发电机" },
        },
        {
          path: "load",
          component: () => import("@/views/MenuSetting/elemdata/child/load"),
          name: "station_load",
          meta: { title: "负荷" },
        },
        {
          path: "devparams",
          component: () => import("@/views/MenuSetting/elemdata/child/devparams"),
          name: "station_devparams",
          meta: { title: "负荷" },
        }
      ],
    },
    {
      path: "ms/elemdata/topology",
      component: () => import("@/views/MenuSetting/elemdata/child/topology"),
      name: "station_topology",
      meta: { title: "一次主接线拓扑" },
    },
    {
      path: "ms/elemdata/relaible",
      component: () => import("@/views/MenuSetting/elemdata/child/relaible"),
      name: "station_relaible",
      meta: { title: "元件可靠线参数" },
    },
    {
      path: "ms/tooldata/work",
      component: () => import("@/views/MenuSetting/tooldata/work"),
      name: "ms_tooldata_work",
      meta: { title: "检修作业定义", noCache: true },
    },
    {
      path: "ms/tooldata/grid",
      component: () => import("@/views/MenuSetting/tooldata/grid"),
      name: "ms_tooldata_grid",
      meta: { title: "检修作业定义", noCache: true },
    },
    {
      path: "ms/userdata/user",
      component: () => import("@/views/MenuSetting/userdata/user"),
      name: "ms_tooldata_grid",
      meta: { title: "用户信息管理", noCache: true },
    },
  ],
};

export default reportRouter
