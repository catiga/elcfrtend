
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
            const nsla_k = 'bus'
            let sql = `select a.nsla_v from c1_name_show_level_area a where a.nsla_k='${nsla_k}' and a.proj_id=${currentOpenedProject.id}`
            if(whereAttrs) {
                if(whereAttrs.nsla_v) {
                    sql = sql + ` and nsla_v like '%${whereAttrs.nsla_v}%'`
                }
            }
            
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                sql = sql + ` order by a.nsla_index asc`
                sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`
                console.log('ppppp===', sql)
                db.query(sql, function(err, values, fields) {
                    resolve({
                        code: 200,
                        data: _.cloneDeep({total: total, list: values})
                    })
                })
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getBusLevelAreaByPage(pagination, proj_id) {
    return new Promise((resolve, reject) => {
        try {
            console.log('pagination', pagination)
            let sql = `select bla_2, bla_5, bla_6, bla_10, bla_8, bla_9, bla_12, bla_13, bla_7 from c1_bus_level_area where proj_id=${proj_id} order by id asc`
            sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`
            console.log('sql===', sql)
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep({list: values})
                })
            })
        } catch(err) {
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

