//https://www.geeksforgeeks.org/node-js-mysql-insert-into-table/    , ver esto para modularizar

const mysql = require('mysql2');


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

module.exports = con;
