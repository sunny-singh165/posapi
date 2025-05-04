const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 144.76.114.186,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool.promise();  // So we can use async/await
