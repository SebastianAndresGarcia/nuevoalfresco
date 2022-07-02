const conexion = require('./db/mysqldb')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const db=require('/Users/udapif/Documents/vscode')
// limpio tabla paises
/*conexion.query("DELETE FROM causas", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
});*/

async function guardarpersona(dni, nombre, ubicacion) {
//https://es.stackoverflow.com/questions/172615/mejorar-m%C3%A9todo-de-b%C3%BAsqueda-sql-server
    var sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (?);`;
    let values = [dni, nombre, ubicacion];

    conexion.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted " + result);
    });
}


module.exports = { guardarpersona };