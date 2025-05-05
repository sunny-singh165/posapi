const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12776945',
  password: '6mkHyKCJFq',
  database: 'sql12776945',
});

module.exports = pool.promise();  // So we can use async/await
