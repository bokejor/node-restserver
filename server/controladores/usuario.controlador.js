/*=============================================
IMPORTACIÓN DEL MODELO
=============================================*/

const Usuario = require('../modelos/usuario');

/*==============================================================
REQUERIMIENTOS PARA GENERAR TOKENS DE AUTORIZACIÓN Y CONTRASEÑAS
==============================================================*/

const bcrypt = require('bcrypt');
const _ = require('underscore');

/*=============================================
MÉTODO GET
=============================================*/

let mostrarUsuarios = (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.json({
                    status: 400,
                    ok: false,
                    mensaje: "Error al almacenar el usuario",
                    err
                })

            }

            Usuario.countDocuments({}, (err, total) => {

                res.json({
                    ok: true,
                    status: 200,
                    total,
                    usuarios



                })



            });
        })
}

/*=============================================
MÉTODO POST
=============================================*/

let crearUsuario = (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.json({
                status: 400,
                ok: false,
                mensaje: "Error al almacenar el usuario",
                err
            })

        }
        res.json({
            ok: true,
            status: 200,
            usuario: usuarioDB,
            mensaje: "El usuario ha sido creado con éxito"

        })

    })
}

/*=============================================
MÉTODO PUT
=============================================*/

let actualizarUsuario = (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.json({
                status: 400,
                ok: false,
                mensaje: "Error al almacenar el usuario",
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            usuario: usuarioDB

        })
    })
}

/*=============================================
MÉTODO DELETE
=============================================*/

let borrarUsuario = (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {

        if (err) {
            return res.json({
                status: 400,
                ok: false,
                mensaje: "Error al borrar el usuario",
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            usuario: usuarioDB

        })
    })
}

module.exports = {
    mostrarUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};