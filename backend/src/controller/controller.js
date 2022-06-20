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
    const dni = (req.params.termino);
    console.log(req.params.termino);
    const nombrecompleto = (req.params.termino);
    conexion.query("SELECT * FROM causas WHERE dni = ? OR nombrecompleto LIKE '%" + nombrecompleto + "%'",[dni], function (err, results, fields) {
        
        results.forEach((result) => {
            personas.push(JSON.parse(JSON.stringify(result)))
        })
        if (err) console.error(err);
        //console.log('User Query Results: ', results);
        res.send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
        console.log(personas)
    });
});
exports.getcausasporbusqueda = getcausasporbusqueda;

/*conexion.getConnection((err, connection) => { //si falla la conexion, entra al if(err)
    if (err) {
      console.error(err);
      res.send(err); //como respuesta le mando el error en formato json, se muestra en el servidor
      return;
    }
    console.log('MySQL Connection: ', connection.threadId);
    connection.query('SELECT * FROM instrumentos', (err, results) => { //ejecuta la consulta
      let instrumentos: instrumento[]=[]
  
        results.forEach((result:any) => {
            instrumentos.push(JSON.parse(JSON.stringify(result)))
        })
      if (err) console.error(err);
      //console.log('User Query Results: ', results);
      res.send(instrumentos)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
      console.log(instrumentos)
    });

  }); */