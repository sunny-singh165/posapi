const db = require('../config/db');

exports.createProduct = async (productdata) => {
    console.log(productdata);
    const [result] = await db.query('INSERT INTO products (prodname, produom, rate, prodcgst, prodsgst, prodcategory, partnerid, restaurantid, isveg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [productdata.prodname, productdata.produom, productdata.rate, productdata.prodcgst, productdata.prodsgst, productdata.prodcategory, productdata.partnerid, productdata.restaurantid, productdata.isveg]);
    
    console.log(result);
    
    return result;
};


exports.getAllProducts = async (partnerid) => {
    const [rows] = await db.query('SELECT * FROM products where partnerid = ?', [partnerid]);
    return rows;
}

exports.getAllCategories = async (partnerid) => {
    const [rows] = await db.query('SELECT DISTINCT prodcategory FROM products WHERE partnerid = ? ORDER BY prodcategory ASC', [partnerid]);
    return rows;
}