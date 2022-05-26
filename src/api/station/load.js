
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'p_load_trend_info'
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
        // currentOpenedProject.id = 1;
        try {
            let sql = `select a.c_load,a.nsla_id,a.nsla_index,b.lla_2,b.lla_3,b.lla_id,a.id from 
            (select nsla.nsla_v c_load,nsla.nsla_index,nsla.id nsla_id,nsla.id id from c1_name_show_level_area nsla where nsla.nsla_k = 'load' and nsla.proj_id = ${currentOpenedProject.id}) a 
            join (select lla.lla_2,lla.lla_3,@rowno:=@rowno+1 as nsla_index,lla.id lla_id from c1_load_level_area lla, (select @rowno:=0) t where proj_id=${currentOpenedProject.id} order by lla.id asc ) b on a.nsla_index = b.nsla_index`;
            if(whereAttrs) {
                // if(whereAttrs.name_1) {
                //     sql = sql + ` and id_name like '%${whereAttrs.id_name}%'`
                // }
            }
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} desc`
                }
                sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`

                console.log(sql);
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
    let sql = `update ${Table} set id_name='${obj.id_name}', pl=${obj.pl}, ql=${obj.ql} where id=${obj.id}`
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

