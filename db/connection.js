const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'SQLPassword769',
        database: 'tracker'
    },
    console.log('Connected to the Employee Tracking Database')
);

module.exports = db;