//import db from '../datastore'

import db from '../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

const Table = 'task_weak_info'

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
            console.log(sql)
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

export function saveWeakTask(form, topo, proj_id) {
    return new Promise((resolve, reject) => {
        try {
            const title = form.name
            const a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            const topo_id = topo.topo.id
            const computing = 0

            let topo_method = []
            for(let x in topo['head']) {
                if(topo['head'][x].index == form.select) {
                    topo_method.push({head: topo['head'][x]})
                    break
                }
            }
            for(let x in topo['item']) {
                if(topo['item'][x].index == form.select) {
                    topo_method.push({item: topo['item'][x]})
                }
            }
            for(let x in topo['body']) {
                if(topo['body'][x].index == form.select) {
                    topo_method.push({body: topo['body'][x]})
                }
            }
            let sql = `insert into ${Table}(title, proj_id, topo_id, a_time, flag, computing, topo_method) 
                values('${title}', ${proj_id}, ${topo_id}, '${a_time}', 0, ${computing}, '${JSON.stringify(topo_method)}')`

            db.query(sql, function(err, values, fields) {
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
            let sql = `select * from cweak_compute_result where task_id=${task_id}`
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
                //处理数据
                let weakLoad = []
                let weakVoltage = []
                let arr_weak_load = values[0]['weak_load'].split(";")
                for(let x=0; x<arr_weak_load.length; x++) {
                    weakLoad.push(arr_weak_load[x].split(","))
                }

                let arr_weak_voltage = values[0]['weak_voltage'].split(";")
                for(let x=0; x<arr_weak_voltage.length; x++) {
                    weakVoltage.push(arr_weak_voltage[x].split(","))
                }
                resolve({
                    code: 200,
                    data: {
                        weakLoad: weakLoad,
                        weakVoltage: weakVoltage
                    }
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