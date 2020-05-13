const { getUserID, getUser } = require('../model/modelUsers.js');

const loginUser = async (req, res) => {
    const { user, password } = req.body;
    res.json(await getUserID(user, password));
};

const getUserData = async (req, res) => {
    const { userID } = req.body;
    res.json(await getUser(userID));
};
const addUser = (req, res, next) => {};
const modifyUser = (req, res, next) => {};

module.exports = {
    loginUser,
    getUserData,
    addUser,
    modifyUser,
};
