const express = require('express');
const { renderAPP } = require('../controller/controllerMain.js');
const { getFirebaseConfig } = require('../controller/controllerFirebase.js');
const { loginUser, getUserData, addUser, modifyUser } = require('../controller/controllerUsers');
const { registro } = require('../controller/controllerRegistro');
const router = express.Router();

router.get('/', renderAPP);
router.get('/registro', registro);
router.get('/getFirebaseConfig', getFirebaseConfig);
router.get('/loginUser/:user', loginUser);
router.get('/getUserData/:userID', getUserData);
router.get('/addUser/:user', addUser);
router.get('/modifyUser/:user', modifyUser);

module.exports = router;
