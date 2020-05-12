const { findUser } = require('../model/modelLogin');

// Devuelve los datos sin procesar, ya que se los damos formateados desde model.finduser.
const verifyUser = async (user, password) => await findUser(user, password);

module.exports = { verifyUser };
