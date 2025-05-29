const db = require('../config/db');

exports.getAllTables = async () => {
    const [rows] = await db.query('SELECT * FROM tables');
    return rows;
}

exports.getTableById = async (id) => {
    const [rows] = await db.query('SELECT * FROM tables where id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }
    return rows[0]; 
}