const fs = require('fs');
const pdf = require('pdf-parse');
var md5 = require('md5');
const crypto = require('crypto');



fs.readdir('./pdf/nuevascausas', async (err, files) => {
    if (err) {
        console.log(err);
    }
    console.log(files)
    await leerpdf(files);
});
async function leerpdf(files) {
    for (const file of files) {

        let dataBuffer = fs.readFileSync(`./pdf/nuevascausas/${file}`);
        const hashSum = crypto.createHash('md5');
        hashSum.update(dataBuffer);
        const hex = hashSum.digest('hex');
        // console.log("hash: " +hex);

        pdf(dataBuffer).then(function (data) {

            // PDF info
            // console.log("Data Info: ", data.info);
            let fecha = data.info.CreationDate
            console.log(data.info.CreationDate)
            fecha = fecha.slice(2)
            let fechafinal = fecha.substring(0, 4) + "-" + fecha.substring(4, 6) + "-" +  fecha.substring(6, 8);
           
            const reg = /^([\d]{4}\-[\d]{2}\-[\d]{2})$/g;
            if (reg.test(fechafinal)) {
                console.log("fecha de creación " + fechafinal + "\n") //fecha de creación D:20220302092622-03'00'
            } else {
                console.log("no tiene formato de fecha") 
            }

            // PDF metadata
            // console.log("metadatos: ", data.metadata);
            // PDF.js version
            // check https://mozilla.github.io/pdf.js/getting_started/
            //console.log(data.version);
            // PDF text
            //console.log("data text :" + data.text);


        });
    }
}