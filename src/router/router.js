const express = require('express');
const { renderAPP } = require('../controller/controllerMain.js');
const { getFirebaseConfig } = require('../controller/controllerFirebase.js');
const {
    loginUser,
    getUserData,
    addUser,
    modifyUser,
    getUserByName,
} = require('../controller/controllerUsers.js');

const { getReservas } = require('../controller/controllerReservas.js');

const { registro } = require('../controller/controllerRegistro.js');
const router = express.Router();

router.get('/', renderAPP);
router.get('/registro', registro);
router.get('/getFirebaseConfig', getFirebaseConfig);
router.get('/loginUser/:user', loginUser);
router.get('/getUserData/:userID', getUserData);
router.post('/addUser', addUser);
router.get('/modifyUser/:user', modifyUser);
router.post('/getReservas', getReservas);
router.post('/getUserByName', getUserByName);

module.exports = router;
