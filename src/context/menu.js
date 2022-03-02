//import { app, remote } from 'electron'

const { Menu, BrowserWindow, dialog, app, remote, shell, ipcRenderer } = require('electron');

//console.log('准备获取remote的global', global.sharedObject.mainWindow);
let processMainWindow = global.sharedObject.mainWindow;
//console.log('主进程中获取到的窗口对象', processMainWindow);

const sendMenuEvent = async(url) => {
  if(processMainWindow) {
    console.log('准备跳转', url);
    console.log(processMainWindow.webContents);
    processMainWindow.webContents.send('change-view', url);
    console.log('跳转完成');
  }
}

const systemMenus = [{
  label: '文件',
  submenu: [{
    label: '打开工程',
    click: async (item, focusedWindow) => {
      //console.log('准备跳转22222', item)
      sendMenuEvent('/incomeAndExpenditure');
      //openchild();
    }
  }, {
    label: '新建工程',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '保存工程',
    click: function (item, focusedWindow) {
    }
  }, {
    label: '最近打开',
    click: function (item, focusedWindow) {
    }
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
    }
  }, {
    label: '厂站',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '母线',
    click: function (item, focusedWindow) {
    }
  }, {
    label: '交流线',
    click: function (item, focusedWindow) {
    }
  }, {
    label: '并联电容/电抗器',
    click: function (item, focusedWindow) {
    }
  },
  {
    label: '变压器',
    click: function (item, focusedWindow) {
    }
  }, {
    label: '负荷',
    click: function (item, focusedWindow) {
    }
  },
  {
    type: 'separator'
  },
  {
    label: '一次主接线拓扑',
    click: function (item, focusedWindow) {
    }
  },
  {
    type: 'separator'
  },
  {
    label: '元件可靠线参数',
    click: function (item, focusedWindow) {
    }
  }]
},
{
  label: '工具',
  submenu: [{
    label: 'PSASP数据导入',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '检修作业定义',
    click: function (item, focusedWindow) {
    }
  }, {
    type: 'separator'
  }, {
    label: '区域电网自动等值',
    click: function (item, focusedWindow) {
    }
  }]
},
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
{
  label: '用户管理',
  submenu: [{
    label: '用户信息管理',
    click: function (item, focusedWindow) {
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