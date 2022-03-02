import mysql from '../context/mysql'
import path from 'path'
import fs from 'fs-extra'
// 引入remote模块
import { app, remote } from 'electron'
// package.json
import pkg from '../../package.json'

// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app

// 获取electron应用的用户目录
const STORE_PATH = APP.getPath('userData')
// console.log(STORE_PATH)
// dev C:\Users\JD\AppData\Roaming\Electron
// prod C:\Users\JD\AppData\Roaming\PocketBook

if (process.type !== 'renderer') {
    // 如果不存在路径
    if (!fs.pathExistsSync(STORE_PATH)) {
        // 就创建
        fs.mkdirpSync(STORE_PATH)
    }
}

const db = mysql;

export default db // 暴露出去