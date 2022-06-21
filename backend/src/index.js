const fs = require('fs');
const pdf = require('pdf-parse');
const conexion = require('./db/mysqldb')

const guardar = require('./guardarpersonassql')

let i = 0;
let sinnombre = 0;


async function comenzar() {
    fs.readdir('./pdf/data/data', async (err, files) => {
        if (err) {
            console.log(err);
        }
        console.log(files)
        await leerpdf(files);

    });
}
comenzar();

async function leerpdf(files) {
    const personas=[{ dni: "", nombrecompleto: "", ubicacion: "" }];
    
    const documento = []
    let i = 0
    for (const file of files) {
        let dni = ""
        let nombrecompleto = ""
        let ubicacion = ""
        let dataBuffer = fs.readFileSync(`./pdf/data/data/${file}`);
        await pdf(dataBuffer).then(async function (data) {
            dni = buscardni(data);
            nombrecompleto = buscarnombreyapellido(data);
            ubicacion = `./pdf/data/data/${file}`; //console.log(dni + nombrecompleto + ubicacion)
            personas.push({ dni, nombrecompleto, ubicacion }); //console.log(personas)
            documento.push(dni)
        });

    }
    console.log("TERMINADO")

    console.log("persona.legnth" + personas.length)
    for (const doc in personas) {
        console.log(personas[doc].dni)

    }
    guardardb(personas);
    /*for (const doc in documento) {
        console.log(documento[doc])

    }*/

}


/*var sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (?);`;
let values = ["12222", "nombre", "ubicacion"];
conexion.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted " + result);
});*/

/*
pdf(dataBuffer).then(function (data) {
    
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log("data text :" + data.text);
    
    buscardni(data);
    buscarnombreyapellido(data);
}); */

function buscardni(data) {
    const reg = /([\d]{1,2}\.?[\d]{3,3}\.?[\d]{3,3})(?![/])/g;
    //reg.test(data.text)
    // const reg=/(?<=-)[1-9][0-9]{6,7}/g; // reg.test(filename) para que me encuentre dni en filename que vengan dps del guión y empiecen con un nro distinto de cero https://regexr.com/

    if (reg.test(data.text)) {
        i++
        let dni=data.text.match(reg);
        dni=dni.toString().replaceAll('.', '');
        console.log("" + i + ")" + "DNI " + dni)
        return dni
    } else {
        console.log("no encontró dni")
        return ("")
    }

}

function buscarnombreyapellido(data) {
    const reg = /([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)(?=(\,?)+[ ]+[DNI])/g;
    const reg2 = /([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)(?=(\,?)+[ ]+[D.N.I])/g;
    const reg3 = /(([A-ZÁÉÍÓÚ]{1}[A-ZÁÉÍÓÚÑ(\,?)]+[\s]*)|([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú(\,?)]+[\s]*))+(?=(\,?)+(\ ?)+[D(\.?)]+[N(\.?)]+[I(\.?)])/g;

    if (reg3.test(data.text)) {
        let nombre=data.text.match(reg3);
        nombre=nombre.toString().replaceAll(',', ''); //borra las comas
        nombre=nombre.toString().replaceAll(/\s+/g, ' ').trim(); //borra espacios de más entre string, y si tiene espacios al inicio o al final
        nombre=nombre.toUpperCase(); //convierte todas las letras a mayúscula
        nombre=nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//para quitar los acentos
        console.log("nombre y apellido " + nombre + "\n")
        return nombre
    } else {
        sinnombre++
        console.log("no encontró nombre" + "(" + sinnombre + ")" + "\n")
        return data.text.match(reg3)
    }
}

function guardardb(personas) {
    for (let doc=1;doc<personas.length;doc++) {
        //console.log("dentro de fcion guardardb "+personas[doc].nombrecompleto)
        let values = []
        var sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (?);`;
        values = [personas[doc].dni, personas[doc].nombrecompleto, personas[doc].ubicacion];
        conexion.query(sql, [values], function (err, result) {
            if (err)
                throw err;
            console.log("1 record inserted " + result);
            
        });
    }
    conexion.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
      });
}

