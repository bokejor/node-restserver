/*=============================================
El process es un objeto global que corre en todo el entorno de desarrollo de nodeJS
=============================================*/
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://BoKeJoR:GUOlSmAyAtni7GMA@cluster0.5f5cn.mongodb.net/cafe'
        // process.env.MONGO_URI;
}
process.env.URLDB = urlDB;