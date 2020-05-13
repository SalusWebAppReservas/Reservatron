const { getUserID, getUser, insertUser } = require('../model/modelUsers.js');

const loginUser = async (req, res) => {
    const { user, password } = req.params;
    res.json(await getUserID(user, password));
};

const getUserData = async (req, res) => {
    const { userID } = req.params;
    res.json(await getUser(userID).String());
};
const addUser = (req, res) => {
    const { user } = req.params;
    insertUser(user);
};
const modifyUser = (req, res) => {};

module.exports = {
    loginUser,
    getUserData,
    addUser,
    modifyUser,
};
