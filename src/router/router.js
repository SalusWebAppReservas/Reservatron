const express = require('express');
const { renderAPP } = require('../controller/controllerMain');
const { getFirebaseConfig } = require('../controller/controllerFirebase');
const { loginUser, getUserData, addUser, getAllUsers } = require('../controller/controllerUsers');
const { addService, getAllServices, getServiceData } = require('../controller/controllerServices');

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

module.exports = router;
