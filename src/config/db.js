const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: pos.massways.com,
  user: masswayscom_posdbuser,
  password: posdb@2025,
  database: masswayscom_posdb,
  port: 3306
});

module.exports = pool.promise();  // So we can use async/await
