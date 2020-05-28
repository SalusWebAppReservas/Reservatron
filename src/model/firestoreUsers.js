const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();
const db = admin.firestore().collection('users');

exports.insertUser = async (user) => {
    try {
        db.doc().set(user, { merge: true });
        return { success: true };
    } catch {
        (err) => {
            console.log(err);
            return { success: false };
        };
    }
};

exports.getUserID = async (user, password) =>
    (await db.where('user', '==', user).where('password', '==', password).get()).docs.map(
        (user) => user.id
    )[0];

exports.getUser = async (userID) =>
    db
        .doc(userID)
        .get()
        .data()
        .catch((err) => console.log(err));

exports.getAllUsers = async () => {
    try {
        return (await db.get()).docs.map((user) => {
            return {
                userID: user.id,
                user: `${user.data().userName} ${user.data().userSurnames}`,
                email: user.data().userEmail,
                userPhone: user.data().userPhone,
            };
        });
    } catch {
        (err) => console.log('error', err);
    }
};
