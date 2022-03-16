//import db from '../datastore'
import db from '../datastore/index_mysql'
import _ from 'lodash'

const moment = require('moment')

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
            let sql = `select * from ${Table} where flag!=-1 and user='${attrs.userId}' and pwd='${attrs.password}'`;
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep(values)
                });
            });

            // const collection = db.get(Table)
            // const list = collection.filter(attrs).value()
            // resolve({
            //     code: 200,
            //     data: _.cloneDeep(list)
            // })
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
            let sql = `update ${Table} set pwd='${attrs.password}' where id=${id}`;
            console.log(sql)
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: values
                });
            });

            // const collection = db.get(Table)
            // const model = collection.updateById(id, attrs).write()
            // resolve({
            //     code: 200,
            //     data: _.cloneDeep(model)
            // })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function modifyInfo(id, attrs) {
    return new Promise((resolve, reject) => {
        try {
            let sql = ``
            if(id) {
                sql = `update ${Table} set name='${attrs.name}', info='${attrs.info}' where id=${id}`
            } else {
                let a_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                sql = `insert into ${Table}(user, pwd, name, info, a_time, flag, type) values('${attrs.user}', '${attrs.password}', '${attrs.name}', '${attrs.info}', '${a_time}', 0, '10')`
            }

            console.log('sql==', sql)
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: values
                });
            });

            // const collection = db.get(Table)
            // const model = collection.updateById(id, attrs).write()
            // resolve({
            //     code: 200,
            //     data: _.cloneDeep(model)
            // })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getAll(attrs) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `select * from ${Table} where flag!=-1`;
            db.query(sql, function(err, values, fields) {
                resolve({
                    code: 200,
                    data: _.cloneDeep(values)
                });
            });
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}
