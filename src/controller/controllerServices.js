const { saveNewService, getAllServices, getServiceData } = require('../model/firestoreServices');

exports.addService = async (req, res) => res.json(await saveNewService(req.body));

exports.getAllServices = async (req, res) => res.json(await getAllServices());

exports.getServiceData = async (req, res) => res.json(await getServiceData(req.params.serviceID));
