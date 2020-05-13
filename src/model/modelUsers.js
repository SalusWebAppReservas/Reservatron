const admin = require('firebase-admin');

const serviceAccount = require('../../db.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://reservatron-7761e.firebaseio.com',
});

const db = admin.database();

const getUserID = async (user, password) => {
    const ref = db.ref('usuarios');
    const userID = new Promise((resolve, reject) =>
        ref
            .orderByChild('user')
            .equalTo(user)
            .on(
                'child_added',
                (snapshot) => {
                    const userData = snapshot.val();
                    resolve({
                        user: userData.user === user ? true : false,
                        password: userData.password === password ? true : false,
                        userID:
                            userData.user === user && userData.password === password
                                ? snapshot.key
                                : false,
                    });
                },
                (errorObject) => reject('The read failed: ', errorObject.code)
            )
    );
    return userID;
};

const getUser = (userID) => {
    const ref = db.ref('usuarios');
    const user = new Promise((resolve, reject) =>
        ref
            .orderByKey()
            .equalTo(userID)
            .on(
                'child_added',
                (snapshot) => {
                    resolve(snapshot.val());
                },
                (errorObject) => {
                    reject('The read failed: ' + errorObject.code);
                }
            )
    );
    return user;
};

const insertUser = (user) => {
    const db = admin.database();
    const ref = db.ref('usuarios');

    const isSaveOk = new Promise((resolve) =>
        ref.push(
            {
                user: user.user,
                password: user.password,
                name: user.name,
                surnames: user.surnames,
                phone: user.phone,
                email: user.email,
                postalCode: user.postalCode,
                address: user.address,
            },
            (error) => (error ? resolve(false) : resolve(true))
        )
    );
    return isSaveOk;
};

module.exports = { insertUser, getUser, getUserID };
