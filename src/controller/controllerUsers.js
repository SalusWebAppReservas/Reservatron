const { getUserID, getUser, insertUser, modelGetUser } = require('../model/modelUsers.js');

const loginUser = async (req, res) => {
    const { user, password } = JSON.parse(req.params.user);
    res.json(await getUserID(user, password));
};

const getUserData = async (req, res) => {
    const { userID } = req.params;
    res.json(await getUser(userID).String());
};
const addUser = (req, res) => {
    const user = req.body;
    insertUser(user);
};
const modifyUser = (req, res) => {};

const getUserByName = async (req, res) => {
    const { nombreUsuario } = req.params;
    res.json(await modelGetUser(userName));
};

module.exports = {
    loginUser,
    getUserData,
    addUser,
    modifyUser,
    getUserByName,
};
