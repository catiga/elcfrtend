// const fs = require('fs')
// const path = require('path')
import fs from 'fs';
import path from 'path'

const log = require('electron-log');

log.transports.file.resolvePath = () => path.join(process.cwd(), 'smartgrid.log')
log.info(path.join(process.cwd(), 'smartgrid.log'))

// export const readFile = function(callback) {
//     fs.readFile(path.join(__dirname, './wh_smartgrid.sql'), (err, data) => {
//         if(err) callback(err)
//         callback(null, data.toString())
//     })
// }

// export async function readFile2() {
export const readFile = async function() {
    log.info('Hello, readFile');
    log.warn('Some problem appears');
    return new Promise((resolve, reject) => {
        let sqlFilePath;
        if (process.env.NODE_ENV === 'development') {
            sqlFilePath = path.join(__dirname, '../../midware/wh_smartgrid.sql')
        } else {
            sqlFilePath = path.join(process.cwd(), '/resources/midware/wh_smartgrid.sql')
        }
        console.log('normal:', sqlFilePath)
        log.info('eclogvvv:', sqlFilePath, "env path:", process.env.NODE_ENV)
        // fs.readFile(path.join(__dirname, './wh_smartgrid.sql'), (err, data) => {
            fs.readFile(sqlFilePath, (err, data) => {
            if(err) reject(err)
            resolve(data.toString())
        })
    })
}

export default {
    // readFile,
    readFile
}