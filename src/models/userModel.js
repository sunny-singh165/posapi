const db = require('../config/db');

exports.createUser = async (username, userpass) => {
    const [result] = await db.query('INSERT INTO users (username, userpass) VALUES (?, ?)', [username, userpass]);
    return result;
};

exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

exports.getUserbyId = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }
    return rows[0];
};

exports.userExist = async (username, userpass) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? and userpass = ?', [username, userpass]);
    if (rows.length === 0) {
        return null;
    }

    delete rows[0]["userpass"];
    return rows[0]
   


};


