const mysql = require('mysql');

const pool = mysql.createPool({
    host: '192.168.16.128',
    port: "3306",
    user: 'root',
    password: '123456',
    database: 'wh_smartgrid'
});

//导出查询相关  
var query = function (sql, callback) {
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
    pool,
    query
}
