const express = require('express');
const router = express.Router();
const controller = require('./controller/controller')

router.get('/test', (requ,resp) => resp.send("HOLA MUNDO del archivo rutas"));
//router.get('/getcausas', controller.getcausas) //todas las causas de la bd, se usa al principio con pocos registros para testear
router.get('/getcausasporbusqueda/:termino', controller.getcausasporbusqueda) //termino de busqueda
//router.get('/cargarnuevascausas', controller.cargarnuevas)
//router.get('/guardarcausaBD', controller.guardarcausaBD)


module.exports = router