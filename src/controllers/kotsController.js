const Kots = require('../models/kotsModel');

exports.getKots= async (req, res) => {
    const restaurantid = req.params.restaurantid
    const kots = await Kots.getAllKots(restaurantid);
    res.json(kots);
};


exports.getKotbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const kot = await Kots.getKotbyId(id);

        if (!kot) {
            return res.status(404).json({ error: 'Kot not found' });
        }

        res.json(kot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createKot = async (req, res) => {
    const { kot } = req.body;
    const result = await Kots.createKot(kot);
    res.status(201).json({ id: result.insertId, kot });
};
exports.updateKot = async (req, res) => {
    const { id } = req.params;
    const { kot } = req.body;
    const result = await Kots.updateKot(id, kot);
    res.status(200).json({ id, kot });
};