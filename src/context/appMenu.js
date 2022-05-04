
const { Menu, BrowserWindow, dialog, app, remote, shell, ipcRenderer } = require('electron');

let processMainWindow = global.sharedObject.mainWindow;

const sendMenuEvent = async(url) => {
  if(processMainWindow) {
    processMainWindow.webContents.send('change-view', url);
  }
}

const systemMenus = [{
  label: '文件',
  submenu: [{
    label: '工程管理',
    click: async (item, focusedWindow) => {
      focusedWindow.loadURL('http://localhost:9080/#/projectMgr/p/list')
    }
  }, {
    type: 'separator'
  }, {
    label: '退出',
    click: function (item, focusedWindow) {
      app.quit();
    }
  }]
},
{
  label: '元件数据',
  submenu: [{
    label: '基准值修正',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/benchmark')
    }
  }, 
  {
    type: 'separator'
  }, 
  {
    label: '母线节点',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/moline')
    }
  }, 
  {
    label: '交流线',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/acline')
    }
  }, 
  // {
  //   label: '两绕组变压器',
  //   click: function (item, focusedWindow) {
  //     focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/_2transformer')
  //   }
  // }, 
  // {
  //   label: '三绕组变压器',
  //   click: function (item, focusedWindow) {
  //     focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/_3transformer')
  //   }
  // }, 
  {
    label: '发电机',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/dynamo')
    }
  }, 
  {
    label: '负荷',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/load')
    }
  },
  {
    label: '变电站设备参数',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/station/devparams')
    }
  },
  {
    type: 'separator'
  },
  {
    label: '一次主接线拓扑',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/topology')
    }
  },
  {
    type: 'separator'
  },
  {
    label: '元件可靠线参数',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/elemdata/relaible')
    }
  }]
},
{
  label: '工具',
  submenu: [
  // {
  //   label: 'PSASP数据导入',
  //   click: function (item, focusedWindow) {
  //   }
  // }, 
  {
    type: 'separator'
  }, 
  {
    label: '检修作业定义',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/tooldata/work')
    }
  }, {
    type: 'separator'
  },
  //  {
  //   label: '区域电网自动等值',
  //   click: function (item, focusedWindow) {
  //     focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/tooldata/grid')
  //   }
  // }
]
},

/*
{
  label: '功能控制',
  submenu: [{
    label: '输变电联合系统潮流计算',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '变电站外进线拓扑重构',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '输变电联合系统安全风险定量评估',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '系统薄弱环节分析',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '检修过度方案智能决策功能',
    click: function (item, focusedWindow) {
    }
  }]
},
*/
{
  label: '用户管理',
  submenu: [{
    label: '用户信息管理',
    click: function (item, focusedWindow) {
      focusedWindow.loadURL('http://localhost:9080/#/menuSetting/ms/userdata/user')
    }
  }]
},
{
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '关于',
    click: async () => {
      const { shell } = require('electron')
      await shell.openExternal('https://electronjs.org')
    }
  }]
}]

if (process.platform === 'darwin') {
  systemMenus.unshift({
    label: app.getName(),
    submenu: [
      {
        label: '刷新',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            focusedWindow.reload()
          }
        }
      },
      {
        label: '切换全屏',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      }
    ]
  });
}

const menuFromTemplate = Menu.buildFromTemplate(systemMenus);
Menu.setApplicationMenu(menuFromTemplate);

// export default systemMenus
// export default mainWindow

export {systemMenus, processMainWindow}
