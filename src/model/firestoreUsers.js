const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();

const db = admin.firestore().collection('users');

exports.insertUser = async ({ user, token }) => {
    const { uid } = await admin.auth().verifyIdToken(token);
    try {
        await db.doc(uid).set(user, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.updateTokensUsers = async ({ userID, token }) => {
    try {
        await db
            .doc(userID)
            .update({ webPushTokens: admin.firestore.FieldValue.arrayUnion(token) });
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
        return (await db.doc(userID).get()).data();
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

exports.getDataForYearChart = async (year) => {
    const firstDay = new Date(year, 0, 1).getTime();
    const lastDay = new Date(Number(year) + 1, 0, 0).getTime();

    const users = await db.where('created', '>=', firstDay).where('created', '<=', lastDay).get();

    let usersByMonth = Array(12)
        .fill({})
        .map((e, index) => {
            return { [new Date(year, index).toLocaleString('es-ES', { month: 'long' })]: 0 };
        });
    const totalUsers = users.docs.length;
    users.docs.forEach((user) => {
        const { created } = user.data();
        const month = new Date(Number(created)).toLocaleString('es-ES', { month: 'long' });
        const number = new Date(Number(created)).getMonth();

        usersByMonth[number][month] === 0
            ? (usersByMonth[number][month] = 1)
            : (usersByMonth[number][month] += 1);
    });
    return { totalUsers, registeredUsers: usersByMonth };
};
