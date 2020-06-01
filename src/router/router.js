const express = require('express');
const { renderAPP } = require('../controller/controllerMain');
const { getFirebaseConfig } = require('../controller/controllerFirebase');
const {
    loginUser,
    getUserData,
    addUser,
    getAllUsers,
    updateTokensUsers,
} = require('../controller/controllerUsers');
const { addService, getAllServices, getServiceData } = require('../controller/controllerServices');
const { sendPushNotification } = require('../controller/controllerMessages');

const {
    addReservation,
    getHoursReservedDay,
    getReservationsDay,
    getReservasMonth,
} = require('../controller/controllerReservations');

const { registro } = require('../controller/controllerRegistro');
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
router.post('/addReservation', addReservation);
router.get('/getHoursReservedDay/:day', getHoursReservedDay);
router.get('/getReservationsDay/:day', getReservationsDay);
router.get('/getServiceData/:serviceID', getServiceData);
router.post('/getReservasMonth', getReservasMonth);
router.post('/sendPushNotification', sendPushNotification);
router.post('/updateUser', updateTokensUsers);

module.exports = router;
