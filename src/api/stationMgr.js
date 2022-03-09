
import db from '../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'project_info'
const TableAssets = 'assets'

let currentOpenedProject = remote.getGlobal('sharedObject').openedProject

export function getModelPagination(pagination, whereAttrs, filterFun) {
    if (!currentOpenedProject) {
        resolve({
            code: 200,
            data: []
        })
        return
    }
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from p_station_info where flag!=-1 and proj_id=${currentOpenedProject.id}`;
            if(whereAttrs) {
                if(whereAttrs.ps_name) {
                    sql = sql + ` and ps_name like '%${whereAttrs.ps_name}%'`
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
    let sql = `update p_station_info set ps_name='${obj.ps_name}', stat_type=${obj.stat_type}, zone_no='${obj.zone_no}' where id=${obj.id}`
    console.log('sql=', sql)
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

