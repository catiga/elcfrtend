
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'p_alternator_info'
const TableAssets = 'assets'

let currentOpenedProject = remote.getGlobal('sharedObject').openedProject

export function getModelPagination(pagination, whereAttrs, filterFun) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select a.gen,a.nsla_id,a.nsla_index,b.gla_2,b.gla_3,b.gla_4,b.gla_5,b.gla_9,b.gla_10,b.gla_8,b.gla_id from 
            (select nsla.nsla_v gen,nsla.nsla_index,nsla.id nsla_id from c1_name_show_level_area nsla where nsla.nsla_k = 'gen' and nsla.proj_id = ${whereAttrs.proj_id}) a 
            join (select gla.id gla_id,gla.gla_2,gla.gla_3,gla.gla_4,gla.gla_5,gla.gla_9,gla.gla_10,gla.gla_8,@rowno:=@rowno+1 as nsla_index from c1_generator_level_area gla, (select @rowno:=0) t where proj_id = ${whereAttrs.proj_id} order by gla.id asc ) b on a.nsla_index = b.nsla_index`;
            if(whereAttrs) {
                // if(whereAttrs.name_1) {
                //     sql = sql + ` and id_name like '%${whereAttrs.id_name}%'`
                // }
            }
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} asc`
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
    let sql = `update c1_name_show_level_area set nsla_v = ${obj.gen} where id = ${obj.nsla_id}`
    let sql2 = `update c1_generator_level_area set gla_2 = ${obj.gla_2},gla_3 = ${obj.gla_3},gla_5 = ${obj.gla_5},gla_9 = ${obj.gla_9},gla_10 = ${obj.gla_10},gla_8 = ${obj.gla_8} where id = ${obj.gla_id}`
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
    let sql2 = `delete from c1_generator_level_area where id = ${obj.gla_id}`
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

