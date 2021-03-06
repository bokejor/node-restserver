const express = require('express');
const app = express();

/*=============================================
IMPORTACIÓN DEL CONTROLADOR
=============================================*/
const Usuario = require('../controladores/usuario.controlador');

/*=============================================
IMPORTACIÓN DEL MIDDLEWARE
=============================================*/

const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

/*=============================================
RUTAS HTTP
=============================================*/

app.get('/usuario', verificaToken, Usuario.mostrarUsuarios);
app.post('/usuario', [verificaToken, verificaAdminRol], Usuario.crearUsuario);
app.put('/usuario/:id', [verificaToken, verificaAdminRol], Usuario.actualizarUsuario);
app.delete('/usuario/:id', [verificaToken, verificaAdminRol], Usuario.borrarUsuario);

/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;