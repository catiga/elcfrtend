//import db from '../datastore'

import db from '../datastore/index_mysql'
import _ from 'lodash'

const Table = 'incomeAndExpenditure'
const TableAssets = 'assets'

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
            let sql = 'select * from project_info where flag!=-1';
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
            const collection = db.get(Table)
            const model = collection.insert(document).write()
            const collectionAssets = db.get(TableAssets)
            let assetsAmountOfMoney = 0
            collection.filter({assetsId: model.assetsId}).value().forEach(item => {
                assetsAmountOfMoney += item.type ==='e' ? -item.amountOfMoney : item.amountOfMoney
            })
            // 更新资产表
            collectionAssets.updateById(model.assetsId, {assetsAmountOfMoney: assetsAmountOfMoney}).write()
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
            const collection = db.get(Table)
            const model = collection.updateById(id, attrs).write()
            const collectionAssets = db.get(TableAssets)
            let assetsAmountOfMoney = 0
            collection.filter({assetsId: model.assetsId}).value().forEach(item => {
                assetsAmountOfMoney += item.type ==='e' ? -item.amountOfMoney : item.amountOfMoney
            })
            // 更新资产表
            collectionAssets.updateById(model.assetsId, {assetsAmountOfMoney: assetsAmountOfMoney}).write()
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
            const collection = db.get(Table)
            collection.removeById(id).write()
            resolve({
                code: 200
            })
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
            const collection = db.get(Table)
            ids.forEach(id => {
                collection.removeById(id).write()
            })
            resolve({
                code: 200
            })
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
