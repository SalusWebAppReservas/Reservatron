const express = require('express');
const { renderAPP } = require('../controller/controllerMain.js');
const { getFirebaseConfig } = require('../controller/controllerFirebase.js');

const router = express.Router();

router.get('/', renderAPP);
router.get('/getFirebaseConfig', getFirebaseConfig);

module.exports = router;
