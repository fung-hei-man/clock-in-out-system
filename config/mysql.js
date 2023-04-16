require('dotenv').config()
const mysql = require('mysql')

const db = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DB_NAME
});

module.exports = { db }
