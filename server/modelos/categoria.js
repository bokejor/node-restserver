/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

    nombre: {
        type: String,
        unique: true,
        required: [true, "La categoria es obligatoria"],


    },
    usuario: {
        type: Schema.ObjectId,
        ref: "Usuario"
    }
})


module.exports = mongoose.model("Categoria", categoriaSchema);