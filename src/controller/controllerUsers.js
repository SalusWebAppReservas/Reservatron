<<<<<<< HEAD
const { findUser } = require('../model/modelLogin.js');

// Devuelve los datos sin procesar, ya que se los damos formateados desde model.finduser.
const verifyUser = async (user, password) => await findUser(user, password);

module.exports = { verifyUser };
=======
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
>>>>>>> b5d5bd0b0297a8b110df2702df867525418848fd
