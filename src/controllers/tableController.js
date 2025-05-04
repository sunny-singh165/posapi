const Table = require('../models/tableModel');

exports.getTables = async (req, res) => {
    const tables = await Table.getAllTables();
    res.json(tables);
};


exports.getTableById = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.getTableById(id);

        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        res.json(table);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createTable = async (req, res) => {
    const { tablename, tablearea } = req.body;
    const result = await Table.createTable(tablename, tablearea);
    res.status(201).json({ id: result.insertId, tablename, tablearea });
};