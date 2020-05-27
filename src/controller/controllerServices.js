const { saveNewService, getAllServices } = require('../model/firestoreServices');

exports.addService = async (req, res) => res.json(await saveNewService(req.body));

exports.getAllServices = async (req, res) => res.json(await getAllServices());
