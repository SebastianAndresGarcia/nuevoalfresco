const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const conexion = require('./db/mysqldb')
const crypto = require('crypto');

let i = 0;
let sinnombre = 0;
//let ruta = "./pdf/causas"
module.exports=async function comenzar(ruta) {
    fs.readdir(ruta, async (err, files) => {
        if (err) {
            console.log(err);
        }
        if (files)
            // console.log(files)
            await leerpdf(files, ruta);

    });
}
//comenzar(ruta);  //esta línea se utilizó para realizar la carga por consola con comando node de las primeras 50mil causas

async function leerpdf(files, ruta) {
    const causas = [{ dni: "", nombrecompleto: "", ubicacion: "" }];

    let i = 0
    for (const file of files) {
        let dni = ""
        let nombrecompleto = ""
        let ubicacion = ""
        let fecha = ""
        let dataBuffer = fs.readFileSync(ruta + `/${file}`);
        try {
            console.log("archivo: " + ruta + `/${file}`)
            await pdf(dataBuffer).then(async function (data) {
                dni = await buscardni(data);
                nombrecompleto = await buscarnombreyapellido(data);
                ubicacion = `./pdf/causas/${file}`;
                let guardadoenbd = false
                if (dni != "" || nombrecompleto != "") {
                    const hashSum = crypto.createHash('md5');
                    hashSum.update(dataBuffer);
                    let hashmd5 = hashSum.digest('hex');
                    //console.log("hash: " + hashmd5);
                    fecha = await obtenerfecha(data.info.CreationDate)
                    guardadoenbd = await guardardb(dni, nombrecompleto, ubicacion, fecha, hashmd5);
                }
                 if (guardadoenbd) {
                     guardarencarpeta(file, ruta)
                 }
            });
        } catch (e) {
            console.log("error en fcion leerpdf")
        }
    }
    console.log("TERMINADO")
}

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
    //console.log("dentro de fcion guardardb " + dni)
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

const guardardb = async (dni, nombrecompleto, ubicacion, fecha, hashmd5) => new Promise((resolve, reject) => {
    i++
    let objetopersistido = false
    const sql = `INSERT INTO causasbd(dni, nombrecompleto, ubicacion, fecha, hashmd5) VALUES (?);`;
    values = [dni, nombrecompleto, ubicacion, fecha, hashmd5];
    try {
        console.log("llegó a fc BD")
        conexion.query(sql, [values], function (err, results, fields) {
            if (err) {
                console.error(err);
                objetopersistido = false
            }
            console.log("1 record inserted " + results + " - " + i + ")" + dni);
            objetopersistido = true
            
            return objetopersistido
        });
    } catch (err) {
        console.log("entro al catch " + err)
        objetopersistido = false
        return objetopersistido
    }

    setTimeout(() => resolve("hecho"), 500); //le tuve que poner esto para que de tiempo a ejecutar el query, sino pasaba de largo y no guardaba nada en la bd
    
});

async function guardarencarpeta(file, ruta) {
    const filename = path.basename(`${file}`);
    // console.log(filename);
    const currentPath = path.join(__dirname, '.' + ruta, `${file}`);
    const destinationPath = path.join(__dirname, '../pdf/causas', `${file}`);

    fs.rename(currentPath, destinationPath, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Successfully moved the file ${file}!`);
    });
}

async function obtenerfecha(unformateddate) {
    const reg = /^([\d]{4}\-[\d]{2}\-[\d]{2})$/g;
    let fecha = "";
    unformateddate = unformateddate.slice(2)
    fecha = unformateddate.substring(0, 4) + "-" + unformateddate.substring(4, 6) + "-" + unformateddate.substring(6, 8);
    if (reg.test(fecha)) {
        return fecha;
    } else {
        return ""
    }
}