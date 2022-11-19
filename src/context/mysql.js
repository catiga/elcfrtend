// var r = require('../../midware/syssql')
import r from '../../midware/syssql'

const mysql = require('mysql');
// const pool = mysql.createPool({
//   host: "121.36.139.203",
//   port: "3306",
//   user: "baiqi",
//   password: "baiqi",
//   database: "wh_smartgrid",
// });

const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: "3306",
    user: 'root',
    password: '123456',
});

const exeSql = async function(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}

const initSystem = async function(callback) {
    conn.connect();
    let initSql = await r.readFile().catch(e => {callback(e)})
    let d = await exeSql("SHOW DATABASES")
    let needCreate = true;
    let dbname = 'wh_smartgrid'
    for(let x in d) {
        if(d[x].Database==dbname) {
            needCreate = false; break;
        }
    }
    if(needCreate) {
        d = await exeSql(`CREATE DATABASE ${dbname} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`)
        await exeSql(`use ${dbname}`)
        let arrsql = initSql.split(";")
        for(let y in arrsql) {
            if(arrsql[y].trim().length>0) {
                await exeSql(arrsql[y]).catch(e => {
                    console.log('创建db异常', e, arrsql[y])
                })
            }
        }
    } else {
        console.log('不需要创建')
    }
    callback(null)
}

var pool;

//导出查询相关  
var query = function (sql, callback) {
    if(!pool) {
        pool = mysql.createPool({
            host: '127.0.0.1',
            port: "3306",
            user: 'root',
            password: '123456',
            database: 'wh_smartgrid'
        });
    }
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (err, data, fields) {
                //释放连接    
                // conn.release();    
                pool.releaseConnection(conn);
                //事件驱动回调    
                callback(err, data, fields);
            });
        }
    });
};


//向外暴露方法
module.exports = {
    initSystem,
    //pool,
    query
}
