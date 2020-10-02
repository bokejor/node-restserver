/*=============================================
IMPORTACIÓN DEL MODELO
=============================================*/

const Producto = require('../modelos/producto');

/*=============================================
MÉTODO GET - TODOS LOS PRODUCTOS
=============================================*/

let mostrarProductos = (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al listar las categorias",
                    err
                })

            }

            Producto.countDocuments({}, (err, total) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al listar los productos",
                        err
                    })

                }

                res.json({
                    ok: true,
                    status: 200,
                    total,
                    productos

                })
            });
        })
}

/*=============================================
MÉTODO GET - UN PRODUCTO
=============================================*/

let mostrarProducto = (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, producto) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Error en el servidor",
                    err
                })

            }
            if (!producto) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No existe el producto en la BBDD"
                    }

                })
            }

            res.status(200).json({
                ok: true,
                producto
            })

        })
}

/*=============================================
MÉTODO GET - BUSCAR PRODUCTO
=============================================*/

let buscarProducto = (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, producto) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Error en el servidor",
                    err
                })

            }

            res.status(200).json({
                ok: true,
                producto
            })



        });
}




/*=============================================
MÉTODO POST
=============================================*/

let crearProducto = (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Error al almacenar el producto",
                err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                message: "Error al almacenar el producto",
                err
            })

        }
        res.status(200).json({
            ok: true,
            producto,
            mensaje: "El producto ha sido almacenado con éxito"
        })

    })
}

/*=============================================
MÉTODO PUT
=============================================*/

let actualizarProducto = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let infoProducto = {

        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    }

    Producto.findByIdAndUpdate(id, infoProducto, { new: true, runValidators: true }, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al almacenar el producto",
                err
            })
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            producto

        })
    })
}

/*=============================================
MÉTODO DELETE
=============================================*/

let borrarProducto = (req, res) => {

    let id = req.params.id;
    let body = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al borrar el producto",
                err
            })
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            status: 200,
            message: 'El producto ha sido desactivado',
            producto

        })
    })
}

module.exports = {
    mostrarProductos,
    mostrarProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    buscarProducto
};