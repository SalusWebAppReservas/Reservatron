const { getConfig } = require('../model/modelFirebase.js');

const getFirebaseConfig = (req, res) => res.json(getConfig());

module.exports = { getFirebaseConfig };
