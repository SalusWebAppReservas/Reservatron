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
        const result = await dbUsers.insertUser(user);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json({ success: false });
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
