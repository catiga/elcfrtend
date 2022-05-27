
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
        try {
            let sql = `select a.c_load,a.nsla_id,a.nsla_index,b.lla_2,b.lla_3,b.lla_id,a.id from 
            (select nsla.nsla_v c_load,nsla.nsla_index,nsla.id nsla_id,nsla.id id from c1_name_show_level_area nsla where nsla.nsla_k = 'load' and nsla.proj_id = ${whereAttrs.proj_id}) a 
            join (select lla.lla_2,lla.lla_3,@rowno:=@rowno+1 as nsla_index,lla.id lla_id from c1_load_level_area lla, (select @rowno:=0) t where proj_id=${whereAttrs.proj_id} order by lla.id asc ) b on a.nsla_index = b.nsla_index`;
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
    console.log(obj);
    let sql = `update c1_name_show_level_area set nsla_v = ${obj.c_load} where id = ${obj.nsla_id}`
    let sql2 = `update c1_load_level_area set lla_2 = ${obj.lla_2},lla_3 = ${obj.lla_3} where id = ${obj.lla_id}`
    return new Promise((resolve, reject) => { 
        try {
            db.query(sql, function(err, values, fields) {
                
            });

            db.query(sql2, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: '操作成功'
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

export function delData(obj) {
    console.log(obj);
    let sql = `delete from c1_name_show_level_area where id = ${obj.nsla_id}`
    let sql2 = `delete from c1_load_level_area where id = ${obj.lla_id}`
    return new Promise((resolve, reject) => { 
        try {
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: '操作成功'
                })
            });

            db.query(sql2, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: '操作成功'
                })
            });
            
        } catch (err) {
            console.log(err)
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}
