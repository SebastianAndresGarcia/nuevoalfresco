const fs = require('fs');
const pdf = require('pdf-parse');

fs.readdir('./pdf/data/data', async (err, files) => {
    if (err) {
        console.log(err);
    }
    console.log(files)
    await leerpdf(files);
});
async function leerpdf(files) {
    for (const file of files) {

        let dataBuffer = fs.readFileSync(`./pdf/data/data/${file}`);
        
        pdf(dataBuffer).then(function (data) {

            // number of pages
            //console.log(data.numpages);
            // number of rendered pages
            //console.log(data.numrender);
            // PDF info
            console.log("Data Info: ", data.info);
            console.log("fecha de creación "+ data.info.CreationDate+"\n")
            // PDF metadata
            console.log("metadatos: ", data.metadata);
            // PDF.js version
            // check https://mozilla.github.io/pdf.js/getting_started/
            //console.log(data.version);
            // PDF text
            //console.log("data text :" + data.text);

            
        });
    }
}