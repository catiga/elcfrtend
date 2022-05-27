
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'p_tw_transformer_info'
const TableAssets = 'assets'

let currentOpenedProject = remote.getGlobal('sharedObject').openedProject

export function getModelPagination(pagination, whereAttrs, filterFun) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where flag!=-1 and proj_id=${whereAttrs.proj_id}`;
            if(whereAttrs) {
                if(whereAttrs.l_name) {
                    sql = sql + ` and l_name like '%${whereAttrs.l_name}%'`
                }
            }
            console.log(sql)
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
    let sql = `update ${Table} set l_name='${obj.l_name}', j_name='${obj.j_name}', v0_tap1=${obj.v0_tap1}, v0_tap2=${obj.v0_tap2} where id=${obj.id}`
    return new Promise((resolve, reject) => { 
        try {
            console.log(sql)
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

