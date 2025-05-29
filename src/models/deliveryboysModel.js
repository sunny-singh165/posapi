const db = require('../config/db');

exports.getAllDeliveryboys = async () => {
    const [rows] = await db.query('SELECT * FROM users where usertype = 3');
    return rows;
}

exports.getDeliveryboyById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users where id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Deliveryboy not found');
    }
    return rows[0]; 
}
