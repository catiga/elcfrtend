//import db from '../datastore'
import db from '../datastore/index_mysql'
import _ from 'lodash'

const Table = 'sys_admin'
let _currentLoginUser_;

export function login(data) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where flag!=-1 and user='${data.name}' and pwd='${data.password}'`;
            db.query(sql, function(err, values, fields) {
                _currentLoginUser_ = values[0];
                resolve(_.cloneDeep(_currentLoginUser_));
            });
        } catch (err) {
            return reject(err)
        }
    })
}

export function getModelWhere(attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.filter(attrs).value()
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

export function putModelById(id, attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.updateById(id, attrs).write()
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
