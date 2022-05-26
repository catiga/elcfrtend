
import db from '../../datastore/index_mysql'
import _ from 'lodash'
const electron = require('electron');
const remote = electron.remote;

const moment = require('moment')

const Table = 'c1_name_show_level_area'
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
            let sql = `select a.fbranch,b.tbranch,c.bla_3,c.bla_4,c.bla_5,c.bla_6,c.bla_11,a.nsla_index,a.nsla_id1,b.nsla_id2,c.bla_id from 
            (select nsla.nsla_v fbranch,nsla.nsla_index,nsla.id nsla_id1 from c1_name_show_level_area nsla where nsla.nsla_k = 'fbranch' and nsla.proj_id = ${currentOpenedProject.id}) a 
            join (select nsla.nsla_v tbranch,nsla.nsla_index,nsla.id nsla_id2 from c1_name_show_level_area nsla where nsla.nsla_k = 'tbranch' and nsla.proj_id = ${currentOpenedProject.id}) b on a.nsla_index = b.nsla_index 
            join (select bla.bla_3,bla.bla_4,bla.bla_5,bla.bla_6,bla.bla_11,@rowno:=@rowno+1 as nsla_index,bla.id bla_id from c1_branch_level_area bla, (select @rowno:=0) t where proj_id= ${currentOpenedProject.id} order by bla.id asc ) c on a.nsla_index = c.nsla_index`;

            if(whereAttrs) {
                // if(whereAttrs.ps_name) {
                //     sql = sql + ` and ps_name like '%${whereAttrs.ps_name}%'`
                // }
                // if(whereAttrs.bus_name) {
                //     sql = sql + ` and bus_name like '%${whereAttrs.bus_name}%'`
                // }
            }
            // console.log("sql ",sql);
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} asc`
                }
                sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`

                console.log("sql ",sql);
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
    let sql = `update c1_name_show_level_area set nsla_v = ${obj.fbranch} where id = ${obj.nsla_id1}`
    let sql2 = `update c1_name_show_level_area set nsla_v = ${obj.tbranch} where id = ${obj.nsla_id2}`
    let sql3 = `update c1_branch_level_area set bla_3 = ${obj.bla_3},bla_4 = ${obj.bla_4},bla_5 = ${obj.bla_5},bla_6 = ${obj.bla_6},bla_11 = ${obj.bla_11} where id = ${obj.bla_id}`
    return new Promise((resolve, reject) => { 
        try {
            db.query(sql, function(err, values, fields) {
                
            });

            db.query(sql2, function(err, values, fields) {
                
            });

            db.query(sql3, function(err, values, fields) {
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
    let sql = `delete from c1_name_show_level_area where id = ${obj.nsla_id1}`
    let sql2 = `delete from c1_name_show_level_area where id = ${obj.nsla_id2}`
    let sql3 = `delete from c1_branch_level_area where id = ${obj.bla_id}`
    console.log(sql);
    console.log(sql2);
    console.log(sql3);
    return new Promise((resolve, reject) => { 
        try {
            db.query(sql, function(err, values, fields) {
                
            });

            db.query(sql2, function(err, values, fields) {
                
            });

            db.query(sql3, function(err, values, fields) {
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

