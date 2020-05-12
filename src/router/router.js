const express = require('express');
const { renderAPP } = require('../controller/controllerMain.js');
const { getFirebaseConfig } = require('../controller/controllerFirebase.js');
const { verifyUser, getUser, addUser, modifyUser } = require('../controller/controllerUsers');

const router = express.Router();

router.get('/', renderAPP);
router.get('/getFirebaseConfig', getFirebaseConfig);
router.post('/verifyUser/:user', verifyUser);
router.get('/getUser/:user', getUser);
router.post('/addUser/:user', addUser);
router.put('/modifyUser/:user', modifyUser);

module.exports = router;
