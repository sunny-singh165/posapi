const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    const { partnerid } = req.params;
    const product = await Product.getAllProducts(partnerid);
    res.json(product);
};

exports.getCategories = async (req, res) => {
    const { partnerid } = req.params;
    const category = await Product.getAllCategories(partnerid);
    res.json(category);
};

exports.createProduct = async (req, res) => {
    const { productdata } = req.body;
    const result = await Product.createProduct(productdata);
    res.status(201).json({ id: result.insertId, status: true });
};
