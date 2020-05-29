const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();

const db = admin.firestore().collection('services');

exports.saveNewService = async (service) => {
    try {
        await db.doc().set(service, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: false };
    }
};

exports.getAllServices = async () => {
    try {
        const servicesData = await db.get();
        const services = servicesData.docs.map((doc) => {
            return {
                ID: doc.id,
                fullName: doc.data().nameService,
            };
        });
        return services;
    } catch (error) {
        console.log(error);
    }
};

exports.getServiceData = async (serviceID) => {
    try {
        return (await db.doc(serviceID).get()).data();
    } catch (error) {
        console.log(error);
    }
};
