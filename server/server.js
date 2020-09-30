require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();




const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*=============================================
IMPORTAMOS LAS RUTAS
=============================================*/

app.use(require('./rutas/index'));




mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log("Conectado a la base de datos")

});


app.listen(process.env.PORT, () => {

    console.log("Escuchando el puerto 3000");
})