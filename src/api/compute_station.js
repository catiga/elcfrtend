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

export function loadBranchInfo(proj_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from p_component_branch_info where proj_id=${proj_id}`
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

//加载变电站节点编号
export function loadStationCode(proj_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select max(first_node) as first_node, max(last_node) as last_node from p_component_branch_info where proj_id=${proj_id}`
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        data: '变电站节点编号加载失败'
                    })
                    return;
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

export function loadstationBusName(proj_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from c1_name_show_level_area where proj_id=${proj_id} and nsla_k='bus' order by nsla_index asc`
            db.query(sql, function(err, values, fields) {
                console.log('计算结果', values)
                if(err) {
                    reject({
                        code: 500,
                        data: '变电站站外母线加载失败'
                    })
                    return;
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

export function saveStationCompute(general_form, topo_list, node_list, proj_id) {
    return new Promise((resolve, reject) => {
        try {
            let title = general_form.name
            let fix_type = general_form.checkItem
            let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            let flag = 0
            let topoListStr = ''
            for(let x in topo_list) {
                if(topoListStr === '') {
                    topoListStr = topo_list[x].value
                } else {
                    topoListStr = topoListStr + ';' + topo_list[x].value
                }
            }
            let nodeListStr = ''
            for(let x in node_list) {
                if(nodeListStr === '') {
                    nodeListStr = node_list[x].selectNode + ',' + node_list[x].selectBus
                } else {
                    nodeListStr = nodeListStr + ';' + node_list[x].selectNode + ',' + node_list[x].selectBus
                }
            }

            let sql = `insert into task_station_topo(title, fix_type, a_time, flag, proj_id, topo_list, node_list) 
                    values('${title}', '${fix_type}', '${a_time}', 0, ${proj_id}, '${topoListStr}', '${nodeListStr}')`
            
            db.query(sql, function(err, values, fields) {
                if(err) {
                    resolve({
                        code: 500,
                        data: '保存失败'
                    })
                    return;
                }
                console.log('保存拓扑结果', values)
                resolve({
                    code: 200,
                    data: values
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

export function loadComputeResult(task_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ctopo_compute_result where task_id=${task_id}`
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        data: '计算结果加载失败'
                    })
                    return;
                }
                if(!values || values.length === 0) {
                    reject({
                        code: 500,
                        data: '计算尚未完成'
                    })
                    return;
                }
                //开始构造数据
                console.log('计算结果', values[0])
                let caseOut = values[0]['case_output']
                console.log('caseOut===', caseOut)
                caseOut = caseOut.split('|')
                const methodItems = []
                const methodContents = []
                for(let x in caseOut) {
                    let item = caseOut[x]
                    let arrItem = item.split(';')
                    console.log('x===', x, item, (x==0))
                    if(x == 0) {
                        //方案名称
                        let contentHead = arrItem[0].split(',')
                        let contentBody = arrItem[1].split(',')
                        for(let y in contentHead) {
                            methodItems.push({index: y, name: contentHead[y]})
                        }
                        for(let y in contentBody) {
                            methodContents.push({index: y, name: contentBody[y]})
                        }
                    } else {
                        //全部都是方案内容
                        for(let y in arrItem) {
                            let contentBody = arrItem[y].split(',')
                            for(let z in contentBody) {
                                methodContents.push({index: z, name: contentBody[z]})
                            }
                        }
                    }
                }
                resolve({
                    code: 200,
                    data: {head: methodItems, body: methodContents}
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