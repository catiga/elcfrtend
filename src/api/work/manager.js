//import db from '../datastore'

import db from '../../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

const Table = 'p_repaire_task'

export function loadProjectParams(project) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where proj_id=${project.id} and flag!=-1`
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep(values)
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

export function saveProjectParams(project, attrs) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where proj_id=${project.id} and flag!=-1`
            db.query(sql, function(err, values, fields) {
                if(values && values.length>0) {
                    sql = `update ${Table} set name='${attrs.name}', station_code='${attrs.station_code}', station_name='${attrs.station_name}', base_kv=${attrs.base_kv}, in_station=${attrs.station_enum} where proj_id=${project.id}`
                    db.query(sql, function(e1, v1, f1) {
                        resolve({
                            code: 200,
                            data: values
                        })
                    })
                } else {
                    let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    let sql = `insert into ${Table}(proj_id, name, station_code, station_name, base_kv) values(${project.id}, '${attrs.name}', '${attrs.station_code}', '${attrs.station_name}', ${attrs.base_kv})`
                    db.query(sql, function(e1, v1, f1) {
                        if(e1) {
                            resolve({
                                code: 500,
                            })
                        } else {
                            resolve({
                                code: 200,
                                data: v1
                            })
                        }
                    })
                }
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function loadVolItems(project) {
    const mother_line_table = 'p_moline_info'
    return new Promise((resolve, reject) => {
        try {
            let sql = `select base_kv from ${mother_line_table} where proj_id=${project.id} group by base_kv`
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep(values)
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

export function loadBusItems(busItemCode) {
    const mother_line_table = 'p_moline_info'
    return new Promise((resolve, reject) => {
        try {
            let sql = `select code, bus_name from ${mother_line_table} where base_kv=${busItemCode} group by code, bus_name`
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep(values)
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

