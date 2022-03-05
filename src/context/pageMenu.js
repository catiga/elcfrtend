const pageMenus = [
    {heading: 'Home'},
    {isSingle: true, icon: 'home', text: 'Dashboard', to: '/home'},

    {isSingle: true, icon: 'import_export', text: '工程管理', to: '/projectMgr/style/list'},

    {heading: '计算管理'},
    {
        isGroup: true,
        icon: 'list',
        text: '输变电联合系统潮流计算',
        items: [
            {icon: '', text: '作业列表1'},
            {icon: '', text: '作业列表2'}
        ]
    },
    {
        isGroup: true,
        icon: 'list',
        text: '站外进线拓扑重构',
        items: [
            {icon: '', text: '作业列表1'},
            {icon: '', text: '作业列表2'}
        ]
    },
    {
        isGroup: true,
        icon: 'list',
        text: '风险评估',
        items: [
            {icon: '', text: '作业列表1'},
            {icon: '', text: '作业列表2'}
        ]
    },
    {
        isGroup: true,
        icon: 'list',
        text: '薄弱环节分析',
        items: [
            {icon: '', text: '作业列表1'},
            {icon: '', text: '作业列表2'}
        ]
    },
    {
        isGroup: true,
        icon: 'list',
        text: '检修方案智能决策',
        items: [
            {icon: '', text: '作业列表1'},
            {icon: '', text: '作业列表2'}
        ]
    },

    {divider: true},


    {isSingle: true, icon: 'import_export', text: 'IncomeAndExpenditure', to: '/incomeAndExpenditure'},
    {isSingle: true, icon: 'category', text: 'Category', to: '/category'},
    {isSingle: true, icon: 'account_balance_wallet', text: 'Assets', to: '/assets'},
    {divider: true},
    {heading: '系统'},
    {isSingle: true, icon: 'settings', text: 'Settings', to: '/settings'},
    {isSingle: true, icon: 'visibility_off', text: 'Password', to: '/password'},
    {isSingle: true, icon: 'lightbulb_outline', text: 'Notes', to: '/notes'},
    {isSingle: true, icon: 'help', text: 'Help', to: '/help'},
]

var buildDynamicMenu = function (user) {
    return pageMenus
};


//向外暴露方法
module.exports = {
    buildDynamicMenu
}

//export const dynamicMenus = pageMenus