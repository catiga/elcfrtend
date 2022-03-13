
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'p_threew_transformer_info'
const TableAssets = 'assets'

let currentOpenedProject = remote.getGlobal('sharedObject').openedProject

export function getModelPagination(pagination, whereAttrs, filterFun) {
    return new Promise((resolve, reject) => {
        if (!currentOpenedProject) {
            reject({
                code: 404,
                message: '请先打开工程'
            })
            return
        }
        try {
            let sql = `select * from ${Table} where flag!=-1 and proj_id=${currentOpenedProject.id}`;
            if(whereAttrs) {
                if(whereAttrs.name_1) {
                    sql = sql + ` and name_1 like '%${whereAttrs.l_name}%'`
                }
            }
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} ${pagination.descending?'desc':'asc'}`
                }
                sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`

                db.query(sql, function(err, values, fields) {
                    resolve({
                        code: 200,
                        data: _.cloneDeep({total: total, list: values})
                    })
                })
            });
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function saveStatData(obj) {
    let sql = `update ${Table} set name_1='${obj.name_1}', name_2='${obj.name_2}', name_3='${obj.name_3}', tap1=${obj.tap1}, tap2=${obj.tap2}, tap3=${obj.tap3} where id=${obj.id}`
    return new Promise((resolve, reject) => { 
        try {
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: obj
                })
            });
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

