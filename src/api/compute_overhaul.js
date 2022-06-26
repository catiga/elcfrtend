//import db from '../datastore'

import db from '../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

const Table = 'task_overhaul'

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
                console.log(err)
                if(err) {
                    reject({
                        code: 500,
                        message: '计算作业列表加载失败'
                    })
                    return
                }
                let total = values ? values.length : 0;
                if(pagination.sortBy) {
                    sql = sql + ` order by ${pagination.sortBy} ${pagination.descending?'desc':'asc'}`
                }
                if(pagination.rowsPerPage>0) {
                    sql = sql + ` limit ${pagination.page - 1}, ${pagination.rowsPerPage}`
                }
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

export function loadTopoMethod(proj_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select a.* from ctopo_compute_result a join task_station_topo b on a.task_id=b.id
                 where b.proj_id=${proj_id} and b.flag!=-1 and b.computing=2`   //取计算成功的拓扑计算任务
            
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: '拓扑方案加载失败'
                    })
                    return
                }
                let data = values ? values[0] : null
                if(!data) {
                    reject({
                        code: 500,
                        message: '尚未创建计算成功拓扑方案'
                    })
                    return
                }
                let caseOut = data['case_output']

                console.log('caseOut===', caseOut)
                caseOut = caseOut.split('|')
                const methodHead = []
                const methodItem = []
                const methodContent = []
                for(let x in caseOut) {
                    let item = caseOut[x]
                    let arrItem = item.split(';')
                    if(x == 0) {
                        //方案名称
                        let contentHead = arrItem[0].split(',')
                        let contentBody = arrItem[1].split(',')
                        for(let y in contentHead) {
                            methodHead.push({index: y, name: contentHead[y]})
                        }
                        for(let y in contentBody) {
                            methodItem.push({index: y, name: contentBody[y]})
                        }
                    } else {
                        //全部都是方案内容
                        for(let y in arrItem) {
                            let contentBody = arrItem[y].split(',')
                            for(let z in contentBody) {
                                methodContent.push({index: z, name: contentBody[z]})
                            }
                        }
                    }
                }

                resolve({
                    code: 200,
                    data: {topo:data, head: methodHead, item: methodItem, body: methodContent}
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

/**
 * 
 * @param {*} form 选择的表单
 * @param {*} topo 全部方案
 * @param {*} proj_id 
 * @returns 
 */
export function saveOverhaulTask(form, topo, proj_id) {
    return new Promise((resolve, reject) => {
        try {
            console.log('开始保存1', topo, form)
            const title = form.name
            const a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            const topo_id = topo.topo.id
            const computing = 0

            let topo_method = []
            let topo_method_head = []
            let topo_method_item = []
            let topo_method_body = []
            for(let x in topo['head']) {
                for(let y in form.select) {
                    if(topo['head'][x].index == form.select[y]['index']) {
                        topo_method_head.push(topo['head'][x])
                    }
                }
            }
            for(let x in topo['item']) {
                for(let y in form.select) {
                    if(topo['item'][x].index == form.select[y]['index']) {
                        topo_method_item.push(topo['item'][x])
                    }
                }
            }
            for(let x in topo['body']) {
                for(let y in form.select) {
                    if(topo['body'][x].index == form.select[y]['index']) {
                        topo_method_body.push(topo['body'][x])
                    }
                }
            }
            topo_method.push({'head':topo_method_head, 'item':topo_method_item, 'body':topo_method_body})
            let sql = `insert into ${Table}(title, proj_id, topo_id, a_time, flag, computing, topo_method) 
                values('${title}', ${proj_id}, ${topo_id}, '${a_time}', 0, ${computing}, '${JSON.stringify(topo_method)}')`

            db.query(sql, function(err, values, fields) {
                console.log(err)
                if(err) {
                    console.log(err)
                    reject({
                        code: 500,
                        message: '创建作业失败'
                    })
                    return
                }
                let model = {
                    id : values.insertId,
                }
                resolve({
                    code: 200,
                    data: model
                })
            })
        } catch (err) {
            console.log(err)
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getTaskById(task_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where id=${task_id}`
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: '检修方案计算任务获取失败'
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

export function getTopoResultByOverhaulId(task_id) {
    return new Promise((resolve, reject) => {
        let sql = `select * from ctopo_compute_result where id in (select topo_id from ${Table} where id=${task_id})`
        try {
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: '拓扑数据获取失败'
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

export function getTopoResultByTaskId(task_id) {
    return new Promise((resolve, reject) => {
        let sql = `select * from ctopo_compute_result where task_id=${task_id}`
        try {
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: '拓扑数据获取失败'
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

export function getTopoDataByTask(task_id) {
    return new Promise((resolve, reject) => {
        let sql = `select * from task_station_topo where id in (select task_id from ctopo_compute_result where id in (select topo_id from ${Table} where id=${task_id}))`
        try {
            db.query(sql, function(err, values, fields) {
                if(err) {
                    reject({
                        code: 500,
                        message: '拓扑数据获取失败'
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

export function loadComputeResult(task_id) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from coh_compute_result where task_id=${task_id}`
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
