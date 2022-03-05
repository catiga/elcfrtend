//import db from '../datastore'
import db from '../datastore/index_mysql'
import _ from 'lodash'
import store from '../renderer/store'

const Table = 'user'
let _currentLoginUser_;

export function login(data) {
    return new Promise((resolve, reject) => {
        try {
            // const user = db.read().get(Table).find({userId: data.name, password: data.password}).value()
            // resolve(_.cloneDeep(user))
            let sql = `select * from sys_admin where flag!=-1 and user='${data.name}' and pwd='${data.password}'`;

            console.log('sql===', sql)
            db.query(sql, function(err, values, fields) {
                _currentLoginUser_ = values[0];
                store.commit('updateLoginUser', _currentLoginUser_);
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
