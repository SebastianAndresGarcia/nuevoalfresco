const db = require("../models/index")
const Causas = require("../models/causa.model")(db.sequelize, db.Sequelize)
const { Op } = require("sequelize");

const { sequelize, Sequelize } = require("../models/index");
//const pool = require("../config/db.config.js");

/*const getcausas = (req, res) => new Promise((resolve, reject) => {
    const personas = [];

    pool.query("SELECT * FROM causas", function (err, results, fields) {
        results.forEach((result) => {
            personas.push(JSON.parse(JSON.stringify(result)))
        })
        if (err) console.error(err);
        //console.log('User Query Results: ', results);
        res.send(personas)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
        console.log(personas)
    });
});
exports.getcausas = getcausas; */


exports.getcausasporbusqueda = async function (req, res) {
    const { QueryTypes } = require('sequelize');
    const personas = [];
    const dni = (req.params.termino);
    console.log(req.params.termino);
    const nombrecompleto = (req.params.termino);
    var arrayDenombre = [] = nombrecompleto.split(" ");
    if (arrayDenombre.length === 1) {
        try {
            const results = await sequelize.transaction(async (t) => {
                res.status(200).send(
                    await Causas.findAll({
                        where: {
                            [Op.or]: [
                                { dni: dni },
                                {
                                    nombrecompleto: {
                                        [Op.like]: `%${nombrecompleto}%`
                                    }
                                }
                            ]
                        },
                        order: [
                            ['fecha', 'DESC'],
                        ]
                    }, { transaction: t })
                )
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({ message: err })
        }
    }
    else if (arrayDenombre.length > 1) {
        let sql = "SELECT * FROM causas WHERE nombrecompleto LIKE '%" + arrayDenombre[0] + "%' ";
        for (let i = 1; i < arrayDenombre.length; i++) {
            sql = sql + "AND nombrecompleto LIKE '%" + arrayDenombre[i] + "%' "
        }
        sql = sql + "ORDER BY fecha DESC;"
        console.log("sqlquery: " + sql)
        try {
            const results = await sequelize.transaction(async (t) => {
                res.status(200).send(
                    await sequelize.query(sql, { type: QueryTypes.SELECT })
                )
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({ message: err })
        }
    }
}

exports.cantidaddecausas = async function (req, res) {
    try {
        let cantidad = []
        const results = await sequelize.transaction(async (t) => {
            cantidad.push(await Causas.count({ transaction: t }))
            console.log("cantidad de causas: " + cantidad);
            res.status(200).send(
                JSON.parse(JSON.stringify(cantidad))
            )
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}


const cargarnuevascausas = (req, res) => new Promise((resolve, reject) => {
    console.log(req.files)
    res.send(console.log('archivos subidos correctamente'))
    var guardarcausas = require('../index.js')
    guardarcausas('./pdf/nuevascausas')
});
exports.cargarnuevascausas = cargarnuevascausas;
