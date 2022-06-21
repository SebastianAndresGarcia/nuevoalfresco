const conexion = require('../db/mysqldb')

const getcausas = (req, res) => new Promise((resolve, reject) => {
    const personas = [];

    conexion.query("SELECT * FROM causas", function (err, results, fields) {

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
    const personasresult = [];
    const dni = (req.params.termino);
    console.log(req.params.termino);
    const nombrecompleto = (req.params.termino);
    var arrayDenombre = [] = nombrecompleto.split(" ");

    if (arrayDenombre.length <= 1) {
        conexion.query("SELECT * FROM causas WHERE dni = ? OR nombrecompleto LIKE '%" + nombrecompleto + "%'", [dni], function (err, results, fields) {

            results.forEach((result) => {
                personas.push(JSON.parse(JSON.stringify(result)))
            })
            if (err) console.error(err);
            //console.log('User Query Results: ', results);
            res.send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
            console.log(personas)
        });
    } else {
        console.log("cantidad de palabras de nombre " + arrayDenombre.length);
        conexion.query("SELECT * FROM causas", function (err, results, fields) {

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
    }
});
exports.getcausasporbusqueda = getcausasporbusqueda;

