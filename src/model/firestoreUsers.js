const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();

const db = admin.firestore().collection('users');

exports.insertUser = async (user) => {
    try {
        await db.doc().set(user, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.getUserID = async (user, password) => {
    try {
        const userData = await db.where('user', '==', user).where('password', '==', password).get();
        const userID = userData.docs.map((user) => user.id)[0];
        return userID;
    } catch (error) {
        console.log(error);
    }
};

exports.getUser = async (userID) => {
    try {
        return await db.doc(userID).get().data();
    } catch (error) {
        console.log(error);
    }
};

exports.getAllUsers = async () => {
    try {
        return (await db.get()).docs.map((user) => {
            return {
                ID: user.id,
                fullName: `${user.data().userName} ${user.data().userSurnames}`,
                email: user.data().userEmail,
                phone: user.data().userPhone,
            };
        });
    } catch (error) {
        console.log(error);
    }
};
