//import db from '../datastore'

import db from '../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

const Table = 'task_station_topo'

export function getModelById(id) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.getById(id).value()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getModelWhere(attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.find(attrs).value()
            resolve({
                code: 200,
                data: _.cloneDeep(list)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getModelAll() {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.value()
            resolve({
                code: 200,
                data: _.cloneDeep(list)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getModelExport(filterFun) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.filter(filterFun).value()
            resolve({
                code: 200,
                data: _.cloneDeep(list)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getModelPagination(pagination, whereAttrs, filterFun) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where flag!=-1`;
            if(whereAttrs) {
                if(whereAttrs.dateStart) {
                    sql = sql + ` and a_time>='${whereAttrs.dateStart}'`
                }
                if(whereAttrs.dateEnd) {
                    sql = sql + ` and a_time<='${whereAttrs.dateEnd}'`
                }
            }
            db.query(sql, function(err, values, fields) {
                let total = values.length;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} ${pagination.descending?'desc':'asc'}`
                }
                sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`
                console.log(sql)
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

export function postModel(document) {
    return new Promise((resolve, reject) => {
        try {
            let title = document.title
            let info = document.info
            let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            let sql = `insert into ${Table}(title, info, a_time, flag) values('${title}', '${info}', '${a_time}', 0)`

            db.query(sql, function(err, values, fields) {
                let model = {
                    id : values.insertId,
                    title : title,
                    info : info,
                    a_time : a_time,
                    flag : 0
                }
                resolve({
                    code: 200,
                    data: model
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

export function postOrPutModel(document) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.upsert(document).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function putModelById(id, attrs) {
    return new Promise((resolve, reject) => {
        try {
            let title = attrs.title;
            let info = attrs.info;
            let sql = `update ${Table} set title='${title}', info='${info}' where id=${id}`
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: 1
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

export function putModelWhere(whereAttrs, attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.updateWhere(whereAttrs, attrs).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function replaceModelById(id, attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.replaceById(id, attrs).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function deleteModelById(id) {
    return new Promise((resolve, reject) => {
        try {
            if (id) {
                let sql = `update ${Table} set flag=-1 where id=${id}`
                db.query(sql, function(err, values, fields) {
                    resolve({
                        code: 200
                    })
                });
            } else {
                resolve({
                    code: 200
                })
            }
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function deleteModelByIds(ids) {
    return new Promise((resolve, reject) => {
        try {
            if (ids && ids.length>0) {
                let sql = `update ${Table} set flag=-1 where id in (`
                ids.forEach(id => {
                    sql = sql + `${id},`
                })
                sql = sql.substring(0, sql.length - 1) + `)`
                
                db.query(sql, function(err, values, fields) {
                    resolve({
                        code: 200
                    })
                });
            } else {
                resolve({
                    code: 200
                })
            }
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function deleteModelWhere(whereAttrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.removeWhere(whereAttrs).write()
            resolve({
                code: 200,
                data: _.cloneDeep(list)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function loadProjectParams(project) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from project_params where proj_id=${project.id} and flag!=-1`
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
            if (attrs) {
                Object.keys(attrs).forEach(key => {
                    let value = attrs[key]
                    let sql = `select * from project_params where proj_id=${project.id} and flag!=-1 and param_k='${key}'`
                    db.query(sql, function(err, values, fields) {
                        if(values && values.length>0) {
                            sql = `update project_params set param_v='${value}' where proj_id=${project.id} and param_k='${key}'`
                            db.query(sql, function(e1, v1, f1) {
                                resolve({
                                    code: 200,
                                    data: 1
                                })
                            })
                        } else {
                            let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                            let sql = `insert into project_params(proj_id, param_k, param_v, a_time, flag) values(${project.id}, '${key}', '${value}', '${a_time}', 0)`
                            db.query(sql, function(e1, v1, f1) {
                                resolve({
                                    code: 200,
                                    data: 1
                                })
                            })
                        }
                    })
                })
                // for (let k of attrs.keys()) {
                //    console.log('k==', k)

                    // let sql = `select * from project_params where proj_id=${project.id} and flag!=-1`
                    // db.query(sql, function(err, values, fields) {    
                    // })
                // }
            }
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function countForStat(whereAttrs) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select count(id) t_num from ${Table} where flag!=-1`
            if (whereAttrs && whereAttrs.is_import != -1) {
                sql = sql + ` and is_import=${whereAttrs.is_import}`
            }
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

export function finishProjectUpload(whereAttrs) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `update ${Table} set is_import=1 where id=${whereAttrs.id}`
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

