const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localHost',
        user: 'root',
        password: 'SQLPassword769',
        database: 'tracker'
    },
    console.log('Now listening')
);

module.exports = db;