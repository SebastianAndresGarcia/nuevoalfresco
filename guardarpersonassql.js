const conexion = require('./db/mysqldb')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// limpio tabla paises
/*conexion.query("DELETE FROM causas", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
});*/

function guardarpersona(dni, nombre, ubicacion) {

    var sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (?);`;
    let values = [dni, nombre, ubicacion];

    conexion.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted " + result);
    });
}


module.exports = { guardarpersona };