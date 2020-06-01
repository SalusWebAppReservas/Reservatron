const dbUsers = require('../model/firestoreUsers.js');

const loginUser = async (req, res) => {
    const { user, password } = JSON.parse(req.params.user);
    res.json(await dbUsers.getUserID(user, password));
};

const getUserData = async (req, res) => {
    const { userID } = req.params;
    res.json(await dbUsers.getUser(userID));
};
const addUser = async (req, res) => {
    const user = req.body;
    try {
        await dbUsers.insertUser(user);
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
};

const getAllUsers = async (req, res) => res.json(await dbUsers.getAllUsers());

const updateTokensUsers = async (req, res) => res.json(await dbUsers.updateTokensUsers(req.body));

module.exports = {
    loginUser,
    getUserData,
    addUser,
    getAllUsers,
    updateTokensUsers,
};
