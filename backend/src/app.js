const express = require('express')
const routes = require('./rutas')
const app = express()
/*const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './pdf/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post('/cargarnuevascausas', upload.array('archivos'), function (req, res) {
  console.log(req.files)
  res.send(console.log('archivos subidos correctamente'))
})
*/

var cors = require('cors')
app.use(cors())

app.use(express.json()); //transforma los datos de objetos a json, las consultas realizadas a la bd en el controlador las pasará a json
app.use('/cors', (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, OPTIONS');
    
    res.send({"msg": "This has Cors enabled"})
})

app.use(express.urlencoded({ extended: false })); //transforma los datos de un formulario html en json

app.use(routes);
app.get('/', (request, response) => {
    response.send('Hello Word')
})


app.listen(3000, () => {    //acá levanto al servidor en el puerto 3000
    console.log("Servidor en puerto 3000", 3000);
})

