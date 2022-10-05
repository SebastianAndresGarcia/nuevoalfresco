//https://www.geeksforgeeks.org/node-js-mysql-insert-into-table/    , ver esto para modularizar

/*const mysql = require('mysql');


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'causasenufi',
    port: 3306,
    connectionLimit: 100 //100 es el valor por defecto
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});

module.exports = con; */
//https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4

/*
var mysql = require('mysql');
var pool = mysql.createPool({host: 'localhost',
user: 'root',
password: '12345',
database: 'causasenufi',
port: 3306,
connectionLimit: 10});

// En este punto le pides al pool que te pase una de sus conexiones ya abiertas 
pool.getConnection(function (err, connection) {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
});
module.exports = pool;
*/