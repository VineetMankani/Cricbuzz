const mysql = require('mysql2');
require('dotenv/config');

module.exports = connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});