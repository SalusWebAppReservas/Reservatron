const { findUser } = require('../model/modelLogin.js');

const verifyUser = async (req, res) => {
    const { user, password } = req.body;
    res.json(await findUser(user, password));
};

const getUser = (req, res, next) => {};
const addUser = (req, res, next) => {};
const modifyUser = (req, res, next) => {};

module.exports = {
    verifyUser,
    getUser,
    addUser,
    modifyUser,
};
