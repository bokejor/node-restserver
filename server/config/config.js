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
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Token
// ============================

process.env.SECRET = process.env.SECRET || "este-es-un-SEED-de-desarrollo";

process.env.CADUCIDAD = 60 * 60 * 24 * 30;

// ============================
//  Client ID google
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || "710776103623-74vm8uf2c87f9agn77mlnoknvbkbn9qv.apps.googleusercontent.com";