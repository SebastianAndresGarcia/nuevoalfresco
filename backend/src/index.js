const fs = require('fs');
const pdf = require('pdf-parse');
const conexion = require('./db/mysqldb')
let i = 0;
let sinnombre = 0;

async function comenzar() {
    fs.readdir('./pdf/causas', async (err, files) => {
        if (err) {
            console.log(err);
        }
        console.log(files)
        await leerpdf(files);

    });
}
comenzar();
async function leerpdf(files) {
    const personas = [{ dni: "", nombrecompleto: "", ubicacion: "" }];

    let i = 0
    for (const file of files) {
        let dni = ""
        let nombrecompleto = ""
        let ubicacion = ""
        let dataBuffer = fs.readFileSync(`./pdf/causas/${file}`);
        try {
            console.log("archivo: " + `./pdf/causas/${file}`)
            await pdf(dataBuffer).then(async function (data) {
                dni = await buscardni(data);
                nombrecompleto = await buscarnombreyapellido(data);
                ubicacion = `./pdf/causas/${file}`; //console.log(dni + nombrecompleto + ubicacion)
                //personas.push({ dni, nombrecompleto, ubicacion }); //console.log(personas)
                if (dni != "" || nombrecompleto != "")
                    await guardardb(dni, nombrecompleto, ubicacion);
            });
        } catch (e) {
            console.log("error en fcion leerpdf")
        }
    }
    console.log("TERMINADO")
    console.log("persona.length" + personas.length)

}
/*async function leerpdf(files) {
    const personas = [{ dni: "", nombrecompleto: "", ubicacion: "" }];

    for (let index = 0; index < files.length; index++) {

        let dni = ""
        let nombrecompleto = ""
        let ubicacion = ""
        let dataBuffer = fs.readFileSync(`./pdf/data/${files[index]}`);
        let data = await pdfParser(dataBuffer)
        if (data) {
            dni = await buscardni(data);
            nombrecompleto = await buscarnombreyapellido(data);
            ubicacion = `./pdf/data/${files[index]}`; //console.log(dni + nombrecompleto + ubicacion)
            if (dni != "" || nombrecompleto != "") {
                let dni = ""
                let nombrecompleto = ""
                let ubicacion = ""
                let dataBuffer = fs.readFileSync(`./pdf/data/${files[index]}`);
                let data = await pdfParser(dataBuffer)
                if (data) {
                    dni = await buscardni(data);
                    nombrecompleto = await buscarnombreyapellido(data);
                    ubicacion = `./pdf/data/${files[index]}`; //console.log(dni + nombrecompleto + ubicacion)
                    if (dni != "" || nombrecompleto != "") {
                       await guardardb(dni, nombrecompleto, ubicacion)
                    }
                }
            }
        }
    }
    console.log("TERMINADO")
    console.log("persona.legnth" + personas.length)
} */



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

async function buscardni(data) {
    const reg = /([\d]{1,2}\.?[\d]{3,3}\.?[\d]{3,3})(?![/])/g;
    //reg.test(data.text)
    // const reg=/(?<=-)[1-9][0-9]{6,7}/g; // reg.test(filename) para que me encuentre dni en filename que vengan dps del guión y empiecen con un nro distinto de cero https://regexr.com/

    if (reg.test(data.text)) {
        try {
            //i++
            let dni = await data.text.match(reg);
            dni = dni.toString().replaceAll('.', '');
            dni = dni.split(",", 1);
            //console.log("" + i + ")" + "DNI " + dni)
            return dni
        } catch (e) { return "" }
    } else {
        console.log("no encontró dni")
        return ("")
    }

}

async function buscarnombreyapellido(data) {
    const reg = /([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)(?=(\,?)+[ ]+[DNI])/g;
    const reg2 = /([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)(?=(\,?)+[ ]+[D.N.I])/g;
    const reg3 = /(([A-ZÁÉÍÓÚ]{1}[A-ZÁÉÍÓÚÜÑ(\,?)]+[\s]+)|([A-ZÁÉÍÓÚ]{1}[a-zñáéíóúü(\,?)]+[\s]+))+(?=(\,?)+(\ ?)+[D(\.?)]+[N(\.?)]+[I(\.?)])/g;

    if (reg3.test(data.text)) {
        try {
            let nombre = await data.text.match(reg3);
            nombre = nombre.toString().replaceAll(',', ''); //borra las comas
            nombre = nombre.toString().replaceAll(/\s+/g, ' ').trim(); //borra espacios de más entre string, y si tiene espacios al inicio o al final
            nombre = nombre.toUpperCase(); //convierte todas las letras a mayúscula
            nombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//para quitar los acentos
            //console.log("nombre y apellido " + nombre + "\n")
            return nombre
        } catch (e) { return "" }
    } else {
        sinnombre++
        console.log("no encontró nombre" + "(" + sinnombre + ")" + "\n")
        return ""
    }
}

async function guardar(dni, nombrecompleto, ubicacion) {
    //for (let j = 1; j < personas.length; j++) {
    console.log("dentro de fcion guardardb " + dni)
    //let values = []
    var sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (${dni},${nombrecompleto},${ubicacion});`;
    let values = [dni, nombrecompleto, ubicacion];
    //values = [personas.dni, personas.nombrecompleto, personas.ubicacion];
    conexion.query(sql, function (err,) {
        if (err) {
            console.log(err)
            throw err;
        }

        console.log("1 record inserted " + result);

    });
    // }
    /* conexion.end(function (err) {
         if (err) {
             return console.log('error:' + err.message);
         }
         console.log('Close the database connection.');
     });*/
}

const guardardb = async (dni, nombrecompleto, ubicacion) => new Promise((resolve, reject) => {
    i++
    const sql = `INSERT INTO causas(dni, nombrecompleto, ubicacion) VALUES (?);`;
    values = [dni, nombrecompleto, ubicacion];
    try {
        console.log("llegó a fc BD")
        conexion.query(sql, [values], function (err, results, fields) {
            if (err) console.error(err);
            console.log("1 record inserted " + i + ")" + dni);
        });
    } catch (err) { 
        console.log("entro al catch "+err) 
    }
    setTimeout(() => resolve("hecho"), 100); //le tuve que poner esto para que de tiempo a ejecutar el query, sino pasaba de largo y no guardaba nada en la bd
});

