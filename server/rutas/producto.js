const express = require('express');
const app = express();

/*=============================================
IMPORTACIÓN DEL CONTROLADOR
=============================================*/
const Producto = require('../controladores/producto.controlador');

/*=============================================
IMPORTACIÓN DEL MIDDLEWARE
=============================================*/

const { verificaToken } = require('../middlewares/autenticacion');

/*=============================================
RUTAS HTTP
=============================================*/

app.get('/producto', verificaToken, Producto.mostrarProductos);
app.get('/producto/:id', verificaToken, Producto.mostrarProducto);
app.get('/producto/buscar/:termino', verificaToken, Producto.buscarProducto);
app.post('/producto', verificaToken, Producto.crearProducto);
app.put('/producto/:id', verificaToken, Producto.actualizarProducto);
app.delete('/producto/:id', verificaToken, Producto.borrarProducto);

/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;