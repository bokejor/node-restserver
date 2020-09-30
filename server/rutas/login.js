const express = require('express');

//Requerimos el módulo para generar token de autorización
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


const Usuario = require('../modelos/usuario')
const app = express();

app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })

        }

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.json({
                status: 400,
                ok: false,
                mensaje: "La contraseña es incorrecta"

            })

        }

        let token = jwt.sign({

            usuario: usuarioDB

        }, process.env.SECRET, { expiresIn: process.env.CADUCIDAD })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })


    })
})

module.exports = app;