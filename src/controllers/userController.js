const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    const users = await User.getAllUsers();
    res.json(users);
};


exports.auth = async (req, res) => {
    try {
        const { username, userpass } = req.body;

        const user = await User.userExist(username, userpass);



        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }



        res.status(200).json({ 'message': 'User exists', 'status': true, 'user':user});

    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': err, 'status': false });
    }
};

exports.getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getUserbyId(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    const { username, userpass } = req.body;
    const result = await User.createUser(username, userpass);
    res.status(201).json({ id: result.insertId, username, userpass });
};