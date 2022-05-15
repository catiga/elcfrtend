//import db from '../datastore'

import db from '../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

const Table = 'task_loadflow_info'

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
            let sql = `select * from ${Table} where proj_id=${whereAttrs.proj_id} and flag!=-1`;
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

export function postModel(document, projId) {
    return new Promise((resolve, reject) => {
        try {
            let title = document.title
            let info = document.info
            let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            let sql = `insert into ${Table}(title, info, a_time, flag, proj_id) values('${title}', '${info}', '${a_time}', 0, ${projId})`

            db.query(sql, function(err, values, fields) {
                if(err) {
                    resolve({
                        code: 500,
                        data: '保存失败'
                    })
                    return;
                }
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

export function loadComputeData(task_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from cpf_compute_result where task_id=${task_id}`
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: err
                    })
                    return
                }
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

export function parseData(data0) {
    try {
        let bus_name = data0['bus_name']
        let branch_fname = data0['branch_fname']
        let branch_tname = data0['branch_tname']
        let gen_name = data0['gen_name']
        let bus = data0['bus']
        let branch = data0['branch']
        let gen = data0['gen']

        //定义返回数据
        const molineData = []
        const alterData = []
        const dynamoData = []

        let arrBusName = bus_name.split(',')
        let arrBus = bus.split(';')
        for(let x in arrBusName) {
            let bn = arrBusName[x]
            let arrB = arrBus[x].split(',')
            molineData.push({bn: bn, volF: arrB[8], volJ:arrB[9]})
        }

        let arrBranchFname = branch_fname.split(',')
        let arrBranchTname = branch_tname.split(',')
        let arrBranch = branch.split(';')
        for(let x in arrBranchFname) {
            let bf= arrBranchFname[x]
            let bt = arrBranchTname[x]

            let arrB = []
            if(x<arrBranch.length) {
                arrB = arrBranch[x].split(',')
            }
            let ypower = arrB.length>0 ? arrB[14] : -1
            let npower = arrB.length>0 ? arrB[15] : -1
            alterData.push({fname: bf, tname: bt, ypower: ypower, npower: npower})
        }

        let arrGenName = gen_name.split(',')
        let arrGen = gen.split(';')
        for(let x in arrGenName) {
            let gn = arrGenName[x]
            let arrG = arrGen[x].split(',')
            dynamoData.push({gn: gn, ypower: arrG[2], npower: arrG[3]})
        }

        return {molineData, alterData, dynamoData}
    } catch(err) {
        console.log(err)
        return null
    }
}

