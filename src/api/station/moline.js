
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'p_moline_info'
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
            let sql = `select * from ${Table} where flag!=-1 and proj_id=${currentOpenedProject.id}`
            if(whereAttrs) {
                if(whereAttrs.ps_name) {
                    sql = sql + ` and ps_name like '%${whereAttrs.ps_name}%'`
                }
                if(whereAttrs.bus_name) {
                    sql = sql + ` and bus_name like '%${whereAttrs.bus_name}%'`
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
    let sql = `update ${Table} set ps_name='${obj.ps_name}', bus_name='${obj.bus_name}', zone_no='${obj.zone_no}', base_kv=${obj.base_kv} where id=${obj.id}`
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

