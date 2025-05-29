const db = require('../config/db');

exports.getAllPartners = async () => {
    const [rows] = await db.query('SELECT * FROM partners');
    return rows;
}

exports.getPartnerById = async (id) => {
    const [rows] = await db.query('SELECT * FROM partners where id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Partner not found');
    }
    return rows[0]; 
}
