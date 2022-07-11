const pool = require('../db/mysqldb')

const getcausas = (req, res) => new Promise((resolve, reject) => {
    const personas = [];

    pool.query("SELECT * FROM causasbd", function (err, results, fields) {

        results.forEach((result) => {
            personas.push(JSON.parse(JSON.stringify(result)))
        })
        if (err) console.error(err); 
        //console.log('User Query Results: ', results);
        res.send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
        console.log(personas)
    });
});
exports.getcausas = getcausas;


const getcausasporbusqueda = (req, res) => new Promise((resolve, reject) => {
    const personas = [];
    const dni = (req.params.termino);
    console.log(req.params.termino);
    const nombrecompleto = (req.params.termino);
    var arrayDenombre = [] = nombrecompleto.split(" ");

    if (arrayDenombre.length <= 1) {
        try {
            console.log("entró")
            pool.query("SELECT * FROM causasbd WHERE dni = ? OR nombrecompleto LIKE '%" + nombrecompleto + "%' ORDER BY fecha DESC;", [dni], function (err, results, fields) {

                results.forEach((result) => {
                    personas.push(JSON.parse(JSON.stringify(result)))
                })
                if (err) console.error(err);
                //console.log('User Query Results: ', results);
                res.status(200).send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
                console.log(personas)
                
            });
        } catch (err) {
            console.log(err)
        }
    } else {
        let sql = "SELECT * FROM causasbd  WHERE nombrecompleto LIKE '%" + arrayDenombre[0] + "%' ";
        for (let i = 1; i < arrayDenombre.length; i++) {
            sql = sql + "AND nombrecompleto LIKE '%" + arrayDenombre[i] + "%' "
        }
        sql=sql+"ORDER BY fecha DESC;"
        //console.log("sqlquery: "+sql)
        try {
            pool.query(sql, function (err, results, fields) {
                results.forEach((result) => {
                    personas.push(JSON.parse(JSON.stringify(result)))
                })
                if (err) console.error(err);
                //console.log('User Query Results: ', results);
                res.status(200).send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
                console.log(personas)
                
            });
        } catch (err) {
            console.log(err)
        }
        /*
        console.log("cantidad de palabras de nombre " + arrayDenombre.length);
        pool.query("SELECT * FROM causas", function (err, results, fields) {

            results.forEach((result) => {
                personas.push(JSON.parse(JSON.stringify(result)))
            })
            for (let i = 0; i < personas.length; i++) {
                let coincidencia=true;
                for (let j = 0; j < arrayDenombre.length; j++) {
                    console.log("personabd " + personas[i].nombrecompleto + " terminodebusqueda " + arrayDenombre[j])
                    if (!personas[i].nombrecompleto.includes(arrayDenombre[j])) {
                        console.log("entró al false")
                        coincidencia = false
                    }
                }
                if (coincidencia) {
                    personasresult.push(personas[i])
                }
            }
            if (err) console.error(err);

            res.send(personasresult)
            console.log(personasresult)
        });
    */

    }
});
exports.getcausasporbusqueda = getcausasporbusqueda;

const cantidaddecausas = (req, res) => new Promise((resolve, reject) => {
    const cantidad=[]
    pool.query("SELECT COUNT(*) as cantidad FROM causasbd", function (err, results, fields) {
        results.forEach((result) => {
            cantidad.push(JSON.parse(JSON.stringify(result)))
        })
        if (err) console.error(err); 
        //console.log('User Query Results: ', results);
        res.send(cantidad)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
        console.log(cantidad)
    });
});
exports.cantidaddecausas = cantidaddecausas;

const cargarnuevascausas = (req, res) => new Promise((resolve, reject) => {
    console.log(req.files)
    res.send(console.log('archivos subidos correctamente'))
    var guardarcausas = require('../index.js')
    guardarcausas('./pdf/nuevascausas')
});
exports.cargarnuevascausas = cargarnuevascausas;
