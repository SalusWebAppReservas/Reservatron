const { getUserID, getUserData } = require('../model/modelUsers.js');

const verifyUser = async (req, res) => {
    const { user, password } = req.body;
    res.json(await getUserID(user, password));
};

const getUser = async (req, res) => {
    const { userID } = req.body;
    res.json(await getUserData(userID));
};
const addUser = (req, res, next) => {};
const modifyUser = (req, res, next) => {};

module.exports = {
    verifyUser,
    getUser,
    addUser,
    modifyUser,
};
