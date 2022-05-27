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
      component: require("@/views/MenuSetting/elemdata/benchmark").default,
      name: "ms_elemdata_benchmark",
      meta: { title: "基准值修正", noCache: true },
    },
    {
      path: "ms/elemdata/station",
      component: require("@/views/MenuSetting/elemdata/station").default,
      name: "ms_elemdata_station",
      meta: { title: "厂站数据修正", noCache: true },
      children: [
        {
          path: "stat",
          component: require("@/views/MenuSetting/elemdata/child/stat").default,
          name: "station_stat",
          meta: { title: "厂站" },
        },
        {
          path: "moline",
          component: require("@/views/MenuSetting/elemdata/child/moline").default,
          name: "station_moline",
          meta: { title: "母线" },
        },
        {
          path: "acline",
          component: require("@/views/MenuSetting/elemdata/child/acline")
            .default,
          name: "station_acline",
          meta: { title: "交流线" },
        },
        {
          path: "_2transformer",
          component: require("@/views/MenuSetting/elemdata/child/_2transformer")
            .default,
          name: "station__2transformer",
          meta: { title: "两绕组变压器" },
        },
        {
          path: "_3transformer",
          component: require("@/views/MenuSetting/elemdata/child/_3transformer")
            .default,
          name: "station__3transformer",
          meta: { title: "三绕组变压器" },
        },
        {
          path: "dynamo",
          component: require("@/views/MenuSetting/elemdata/child/dynamo")
            .default,
          name: "station_dynamo",
          meta: { title: "发电机" },
        },
        {
          path: "load",
          component: require("@/views/MenuSetting/elemdata/child/load").default,
          name: "station_load",
          meta: { title: "负荷" },
        },
        {
          path: "devparams",
          component: require("@/views/MenuSetting/elemdata/child/devparams")
            .default,
          name: "station_devparams",
          meta: { title: "变电站设备参数" },
        },
      ],
    },
    {
      path: "ms/elemdata/topology",
      component: require("@/views/MenuSetting/elemdata/child/topology").default,
      name: "station_topology",
      meta: { title: "一次主接线拓扑" },
    },
    {
      path: "ms/elemdata/relaible",
      component: require("@/views/MenuSetting/elemdata/child/relaible").default,
      name: "station_relaible",
      meta: { title: "元件可靠线参数" },
    },
    {
      path: "ms/tooldata/work",
      component: require("@/views/MenuSetting/tooldata/work").default,
      name: "ms_tooldata_work",
      meta: { title: "检修作业定义", noCache: true },
    },
    {
      path: "ms/tooldata/grid",
      component: require("@/views/MenuSetting/tooldata/grid").default,
      name: "ms_tooldata_grid",
      meta: { title: "检修作业定义", noCache: true },
    },
    {
      path: "ms/userdata/user",
      component: require("@/views/MenuSetting/userdata/user").default,
      name: "ms_tooldata_grid",
      meta: { title: "用户信息管理", noCache: true },
    },
  ],
};

export default reportRouter
