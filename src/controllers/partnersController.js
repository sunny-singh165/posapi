const Partners = require('../models/partnersModel');

exports.getPartners= async (req, res) => {
    const partners = await Partners.getAllPartners();
    res.json(partners);
};


exports.getPartnerbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await Partners.getPartnerById(id);

        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        res.json(partner);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
