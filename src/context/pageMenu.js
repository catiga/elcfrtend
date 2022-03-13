const pageMenus = [
  { heading: "Home", key: "home_folder" },
  {
    isSingle: true,
    icon: "home",
    text: "Dashboard",
    to: "/home",
    key: "home_folder_home",
    parent: "home_folder",
  },

  {
    isSingle: true,
    icon: "import_export",
    text: "工程管理",
    to: "/projectMgr/p/list",
    key: "home_folder_project",
    parent: "home_folder",
  },

  { heading: "计算管理", key: "comp_folder" },
  {
    isSingle: true,
    icon: "list",
    text: "输变电联合系统潮流计算",
    key: "comp_folder_loadflow",
    parent: "comp_folder",
    to: "/projectMgr/loadflow/list",
    items: [
      { icon: "", text: "作业列表1" },
      { icon: "", text: "作业列表2" },
    ],
  },
  {
    isSingle: true,
    icon: "list",
    text: "站外进线拓扑重构",
    key: "comp_folder_station",
    parent: "comp_folder",
    to: "/projectMgr/loadflow/station",
    items: [
      { icon: "", text: "作业列表1" },
      { icon: "", text: "作业列表2" },
    ],
  },
  {
    isSingle: true,
    icon: "list",
    text: "风险评估",
    key: "comp_folder_risk",
    parent: "comp_folder",
    to: "/projectMgr/loadflow/risk",
    items: [
      { icon: "", text: "作业列表1" },
      { icon: "", text: "作业列表2" },
    ],
  },
  {
    isSingle: true,
    icon: "list",
    text: "薄弱环节分析",
    key: "comp_folder_weak",
    parent: "comp_folder",
    to: "/projectMgr/loadflow/weak",
    items: [
      { icon: "", text: "作业列表1" },
      { icon: "", text: "作业列表2" },
    ],
  },
  {
    isSingle: true,
    icon: "list",
    text: "检修方案智能决策",
    key: "comp_folder_overhaul",
    parent: "comp_folder",
    to: "/projectMgr/loadflow/overhaul",
    items: [
      { icon: "", text: "作业列表1" },
      { icon: "", text: "作业列表2" },
    ],
  },

  { divider: true },

  {
    isSingle: true,
    icon: "import_export",
    text: "IncomeAndExpenditure",
    to: "/incomeAndExpenditure",
  },
  { isSingle: true, icon: "category", text: "Category", to: "/category" },
  {
    isSingle: true,
    icon: "account_balance_wallet",
    text: "Assets",
    to: "/assets",
  },
  { divider: true },
  { heading: "系统" },
  { isSingle: true, icon: "settings", text: "设置", to: "/settings" },
  { isSingle: true, icon: "visibility_off", text: "密码", to: "/password" },
  { isSingle: true, icon: "lightbulb_outline", text: "Notes", to: "/notes" },
  { isSingle: true, icon: "help", text: "Help", to: "/help" },
];

var buildDynamicMenu = function (user, openedProject) {
    let pm = []
    for (let x in pageMenus) {
        let mi = pageMenus[x]
        let add = true
        if (mi.key === 'comp_folder' || mi.parent === 'comp_folder') {
            if (!openedProject) {
                //add = false
            }
        }

        if (add) pm.push(mi)
    }
    return pm
};


//向外暴露方法
module.exports = {
    buildDynamicMenu
}

//export const dynamicMenus = pageMenus
