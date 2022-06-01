
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
        try {
            let sql = `select a.serial_number, a.name, a.first_node, a.last_node, a.type, a.run_state from p_component_branch_info a where a.proj_id=${whereAttrs.proj_id}`
            if(whereAttrs) {
                if(whereAttrs.nsla_v) {
                    sql = sql + ` and a.name like '%${whereAttrs.name}%'`
                }
            }
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                sql = sql + ` order by a.id asc`
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

export function getC1ReliabilityByPage(pagination, proj_id) {
    return new Promise((resolve, reject) => {
        try {
            console.log('pagination', pagination)
            let sql = `select cr_1, cr_2 from c1_component_relibility where proj_id=${proj_id} order by id asc`
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

