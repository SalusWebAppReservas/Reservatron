const express = require('express');
const { renderAPP } = require('../controller/controllerMain.js');
const { getFirebaseConfig } = require('../controller/controllerFirebase.js');
const {
    loginUser,
    getUserData,
    addUser,
    getAllUsers,
} = require('../controller/controllerUsers.js');
const { addService, getAllServices } = require('../controller/controllerServices');

const { registro } = require('../controller/controllerRegistro.js');
const router = express.Router();

router.get('/', renderAPP);
router.get('/registro', registro);
router.get('/getFirebaseConfig', getFirebaseConfig);
router.get('/loginUser/:user', loginUser);
router.get('/getUserData/:userID', getUserData);
router.post('/addUser', addUser);
router.post('/addService', addService);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllServices', getAllServices);

module.exports = router;
