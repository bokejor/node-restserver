require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*=============================================
IMPORTAMOS LAS RUTAS
=============================================*/

app.use(require('./rutas/index'));

/*=============================================
HABILITAR LA CARPETA PUBLIC
=============================================*/

app.use(express.static(path.resolve(__dirname, '../public')));

/*=============================================
MIDDLEWARE PARA LA SUBIDA DE ARCHIVOS
=============================================*/

app.use(fileUpload({ useTempFiles: true }));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log("Conectado a la base de datos")

});


app.listen(process.env.PORT, () => {

    console.log("Escuchando el puerto 3000");
})