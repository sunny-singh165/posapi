const db = require('../config/db');

exports.getAllCarts = async (restaurantid) => {
    const [rows] = await db.query('SELECT * FROM carts restaurantid = ?', [restaurantid]);
    return rows;
}

exports.getCartById = async (id) => {
    const [rows] = await db.query('SELECT * FROM carts where id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Cart not found');
    }
    return rows[0]; 
}

exports.createCart = async (order) => {
    const [result] = await db.query('INSERT INTO carts SET ?', [order]);
    return result;
}

exports.updateCart = async (id, order) => {
    const [result] = await db.query('UPDATE carts SET ? WHERE id = ?', [order, id]);
    return result;
}
exports.deleteCart = async (id) => {
    const [result] = await db.query('DELETE FROM carts WHERE id = ?', [id]);
    return result;
}