const User = require("../models/User");

const deleteUsers = async (req, res) => {
    await User.deleteMany({});
    res.status(204).send();
};

const createUser = async (req, res) => {
    await User.create(req.body);
    res.status(201).json({ message: "created" });
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).lean();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: "error" });
    }
};

module.exports = {
    createUser,
    deleteUsers,
    getUsers,
};