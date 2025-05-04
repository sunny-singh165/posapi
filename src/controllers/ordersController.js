const Orders = require('../models/ordersModel');

exports.getOrders= async (req, res) => {
    const orders = await Orders.getAllOrders();
    res.json(orders);
};


exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.getOrder(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createOrder = async (req, res) => {
    const { orderdata } = req.body;
    console.log(orderdata)
    const result = await Orders.createOrder(orderdata);
    res.status(201).json({ id: result.insertId, orderdata,status:true });
};
