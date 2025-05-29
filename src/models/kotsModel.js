const db = require('../config/db');

exports.getAllKots = async (restaurantid) => {
    const [rows] = await db.query('SELECT * FROM kots where restaurantid = ?', [restaurantid]);
    return rows;
}

exports.getKotById = async (id) => {
    const [rows] = await db.query('SELECT * FROM kots where id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Kot not found');
    }
    return rows[0]; 
}

exports.createKot = async (kot) => {
    const [result] = await db.query('INSERT INTO kots SET ?', [kot]);
    return result;
}

exports.updateKot = async (id, kot) => {
    const [result] = await db.query('UPDATE kots SET ? WHERE id = ?', [kot, id]);
    return result;
}
exports.deleteKot = async (id) => {
    const [result] = await db.query('DELETE FROM kots WHERE id = ?', [id]);
    return result;
}