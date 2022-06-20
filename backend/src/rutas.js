const express = require('express');
const router = express.Router();
const controller = require('./controller/controller')

router.get('/test', (requ,resp) => resp.send("HOLA MUNDO del archivo rutas"));
router.get('/getcausas', controller.getcausas)
router.get('/getcausasporbusqueda/:termino', controller.getcausasporbusqueda) //termino de busqueda

//router.get('/guardarcausaBD', controller.guardarcausaBD)


module.exports = router