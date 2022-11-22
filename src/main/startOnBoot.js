// 引用winreg模块
var WinReg = require('winreg')
const exec = require('child_process').exec
import path from 'path'

const log = require('electron-log');

log.transports.file.resolvePath = () => path.join(process.cwd(), 'smartgrid.log')

var startOnBoot = {

    // 设置自动启动
    enableAutoStart: function (name, file, callback) {
        var key = getKey()
        key.set(name, WinReg.REG_SZ, file, callback || noop)
    },

    // 取消自动启动
    disableAutoStart: function (name, callback) {
        var key = getKey()
        key.remove(name, callback || noop)
    },

    // 获取是否自动启动
    getAutoStartValue: function (name, callback) {
        var key = getKey()
        key.get(name, function (error, result) {
            if (result) {
                callback(null, result.value)
            } else {
                callback(error)
            }
        })
    },

    startServer: function() {
        let cmdStr = 'java -jar whproject.jar'

        let cmdPath;
        if (process.env.NODE_ENV === 'development') {
            cmdPath = path.join(__dirname, '../../midware/')
        } else {
            //sqlFilePath = path.join(process.cwd(), '/resources/midware/wh_smartgrid.sql')
            cmdPath = path.join(process.cwd(), '/resources/midware/')
        }

        console.log('命令行执行路径：', cmdPath)
        // 子进程名称
        let workerProcess = exec(cmdStr, { cwd: cmdPath })
        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on('data', function (data) {
            console.log('stdout: ' + data)
            log.info('stdout:', data)
        })
        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on('data', function (data) {
            console.log('stderr: ' + data)
            log.error('stderr:', data)
        })
        // 退出之后的输出
        workerProcess.on('close', function (code) {
            console.log('out code：' + code)
            log.info('out code:', code)
        })
        return workerProcess
    }
}

var RUN_LOCATION = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'

// 获取注册表key
function getKey() {
    return new WinReg({
        // hive: WinReg.HKCU, // CurrentUser,
        hive: WinReg.HKLM, // LocalMachine,
        key: RUN_LOCATION
    })
}

// callback自定义方法，你可以在这里写代码
function noop() {
}

// 导出
module.exports = startOnBoot
