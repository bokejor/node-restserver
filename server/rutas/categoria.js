const express = require('express');
const app = express();

/*=============================================
IMPORTACIÓN DEL CONTROLADOR
=============================================*/
const Categoria = require('../controladores/categoria.controlador');

/*=============================================
IMPORTACIÓN DEL MIDDLEWARE
=============================================*/

const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

/*=============================================
RUTAS HTTP
=============================================*/

app.get('/categoria', verificaToken, Categoria.mostrarCategorias);
app.get('/categoria/:id', verificaToken, Categoria.mostrarCategoria);
app.post('/categoria', verificaToken, Categoria.crearCategoria);
app.put('/categoria/:id', verificaToken, Categoria.actualizarCategoria);
app.delete('/categoria/:id', [verificaToken, verificaAdminRol], Categoria.borrarCategoria);

/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;