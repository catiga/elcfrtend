
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
        if (!currentOpenedProject) {
            reject({
                code: 404,
                message: '请先打开工程'
            })
            return
        }
        // currentOpenedProject.id = 1;
        try {
            let sql = `select a.gen,a.nsla_id,a.nsla_index,b.gla_2,b.gla_3,b.gla_4,b.gla_5,b.gla_9,b.gla_10,b.gla_8,b.gla_id from 
            (select nsla.nsla_v gen,nsla.nsla_index,nsla.id nsla_id from c1_name_show_level_area nsla where nsla.nsla_k = 'gen' and nsla.proj_id = ${currentOpenedProject.id}) a 
            join (select gla.id gla_id,gla.gla_2,gla.gla_3,gla.gla_4,gla.gla_5,gla.gla_9,gla.gla_10,gla.gla_8,@rowno:=@rowno+1 as nsla_index from c1_generator_level_area gla, (select @rowno:=0) t where proj_id = ${currentOpenedProject.id} order by gla.id asc ) b on a.nsla_index = b.nsla_index`;
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
    let sql = `update ${Table} set id_name='${obj.id_name}' where id=${obj.id}`
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

