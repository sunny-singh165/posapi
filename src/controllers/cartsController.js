const Carts = require('../models/cartsModel');

exports.getCarts= async (req, res) => {
    const carts = await Carts.getAllCarts();
    res.json(carts);
};


exports.getCartbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Carts.getCartbyId(id);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createCart = async (req, res) => {
    const { cart } = req.body;
    const result = await Carts.createCart(cart);
    res.status(201).json({ id: result.insertId, cart });
};
exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { cart } = req.body;
    const result = await Carts.updateCart(id, cart);
    res.status(200).json({ id, cart });
};