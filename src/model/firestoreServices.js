const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();

const db = admin.firestore().collection('services');

exports.saveNewService = async (service) => {
    try {
        await db.doc().set(service, { merge: true });
        return { success: true };
    } catch {
        (err) => console.log(error);
        return { error: false };
    }
};

exports.getAllServices = () => {
    try {
        await(db.get()).docs.map((doc) => doc.data());
    } catch {
        (err) => console.log(err);
    }
};
