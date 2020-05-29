const DB = require('../model/firestoreReservations');

exports.addReservation = async (req, res) => res.json(await DB.addReservation(req.body));

exports.getHoursReservedDay = async (req, res) =>
    res.json(await DB.getHoursReservedDay(req.params.day));

exports.getReservationsDay = async (req, res) =>
    res.json(await DB.getReservationsDay(req.params.day));
