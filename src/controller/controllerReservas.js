const { modelGetReservas } = require('../model/modelUsers.js');
const getReservas = async (req, res) => {
    const reservas = await modelGetReservas();
    res.json(reservas);
};

module.exports = { getReservas };
