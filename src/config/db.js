const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 144.76.114.186,
  user: posinventory_sunposdbuser,
  password: sunposdbuser@@2025,
  database: posinventory_sunposdb,
});

module.exports = pool.promise();  // So we can use async/await
