
// db.js
require('dotenv').config(); // legge il file .env
const mysql = require('mysql2');

// Creo la connessione a MySQL usando le variabili d'ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || '',
    database: process.env.DB_NAME || 'nome_db'
});

// Provo a connettermi al database
connection.connect((err) => {
    if (err) {
        console.error('❌ Errore connessione a MySQL:', err.message);
    } else {
        console.log('✅ Connesso a MySQL!');
    }
});

module.exports = connection;