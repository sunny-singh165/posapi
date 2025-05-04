const Deliveryboys = require('../models/deliveryboysModel');

exports.getDeliveryboys= async (req, res) => {
    const deliveryboys = await Deliveryboys.getAllDeliveryboys();
    res.json(deliveryboys);
};


exports.getDeliveryboybyId = async (req, res) => {
    try {
        const { id } = req.params;
        const deliveryboy = await Deliveryboys.getDeliveryboyById(id);

        if (!deliveryboy) {
            return res.status(404).json({ error: 'Deliveryboy not found' });
        }

        res.json(deliveryboy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
