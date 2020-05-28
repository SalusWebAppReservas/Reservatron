const dbUsers = require('../model/firestoreUsers.js');

const loginUser = async (req, res) => {
    const { user, password } = JSON.parse(req.params.user);
    res.json(await dbUsers.getUserID(user, password));
};

const getUserData = async (req, res) => {
    const { userID } = req.params;
    res.json(await dbUsers.getUser(userID));
};
const addUser = (req, res) => {
    const user = req.body;
    insertUser(user);
};

const getAllUsers = async (req, res) => res.json(await dbUsers.getAllUsers());

module.exports = {
    loginUser,
    getUserData,
    addUser,
    getAllUsers,
};
