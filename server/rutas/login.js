const express = require('express');
const app = express();

/*=============================================
IMPORTACIÓN DEL CONTROLADOR
=============================================*/
const Usuario = require('../controladores/login.controlador')

/*=============================================
RUTAS HTTP
=============================================*/

app.post('/login', Usuario.login);
app.post('/google', Usuario.google);

/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;