// const fs = require('fs')
// const path = require('path')
import fs from 'fs';
import path from 'path'

// export const readFile = function(callback) {
//     fs.readFile(path.join(__dirname, './wh_smartgrid.sql'), (err, data) => {
//         if(err) callback(err)
//         callback(null, data.toString())
//     })
// }

// export async function readFile2() {
export const readFile = async function() {
    console.log('here called success in')
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './wh_smartgrid.sql'), (err, data) => {
            if(err) reject(err)
            resolve(data.toString())
        })
    })
}

export default {
    // readFile,
    readFile
}