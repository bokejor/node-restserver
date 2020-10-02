/*=============================================
IMPORTACIÓN DEL MODELO
=============================================*/

const Categoria = require('../modelos/categoria');
const _ = require('underscore');

/*=============================================
MÉTODO GET - TODAS LAS CATEGORIAS
=============================================*/

let mostrarCategorias = (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({})
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al listar las categorias",
                    err
                })

            }

            Categoria.countDocuments({}, (err, total) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al listar las categorias",
                        err
                    })

                }

                res.json({
                    ok: true,
                    status: 200,
                    total,
                    categorias

                })
            });
        })
}

/*=============================================
MÉTODO GET - UNA CATEGORIA
=============================================*/

let mostrarCategoria = (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Error en el servidor",
                err
            })

        }
        if (!categoria) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "No existe la categoria en la BBDD"
                }

            })
        }

        res.status(200).json({
            ok: true,
            categoria
        })

    })
}

/*=============================================
MÉTODO POST
=============================================*/

let crearCategoria = (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    })

    categoria.save((err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Error al almacenar la categoria",
                err
            })

        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                message: "Error al almacenar la categoria",
                err
            })

        }
        res.status(200).json({
            ok: true,
            categoria,
            mensaje: "La categoria ha sido creada con éxito"
        })

    })
}

/*=============================================
MÉTODO PUT
=============================================*/

let actualizarCategoria = (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al almacenar la categoria",
                err
            })
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            categoria

        })
    })
}

/*=============================================
MÉTODO DELETE
=============================================*/

let borrarCategoria = (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al borrar la categoria",
                err
            })
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            categoria

        })
    })
}

module.exports = {
    mostrarCategorias,
    mostrarCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
};