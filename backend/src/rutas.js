const express = require('express');
const router = express.Router();
const controller = require('./controller/controller')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './pdf/nuevascausas')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

router.post('/cargarnuevascausas', upload.array('archivos'),controller.cargarnuevascausas)
router.get('/test', (requ,resp) => resp.send("HOLA MUNDO del archivo rutas"));
//router.get('/getcausas', controller.getcausas) //todas las causas de la bd, se usa al principio con pocos registros para testear
router.get('/getcausasporbusqueda/:termino', controller.getcausasporbusqueda) //termino de busqueda
router.get('/cantidaddecausas', controller.cantidaddecausas)

module.exports = router