const admin = require('firebase-admin');

const serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
};

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
                'value',
                (snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) resolve({ user: false, password: false, userID: false });
                    else {
                        const _userID = Object.keys(userData)[0];
                        const _user = userData[_userID].user;
                        const _pass = userData[_userID].password;
                        resolve({
                            user: _user === user ? true : false,
                            password: _pass === password ? true : false,
                            userID: _user === user && _pass === password ? _userID : false,
                        });
                    }
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

const insertUser = ({
    user,
    password,
    userName,
    userSurnames,
    userAddress,
    userPostalCode,
    userPhone,
    userEmail,
}) => {
    const db = admin.database();
    const ref = db.ref('usuarios');

    const isSaveOk = new Promise((resolve) =>
        ref.push(
            {
                user,
                password,
                userName,
                userSurnames,
                userPhone,
                userEmail,
                userPostalCode,
                userAddress,
            },
            (error) => (error ? resolve(false) : resolve(true))
        )
    );
    return isSaveOk;
};

const modelGetReservas = (fecha) => {
    const ref = db.ref('reservas');
    const reservas = new Promise((resolve, reject) =>
        ref.on(
            'value',
            (snapshot) => {
                resolve(snapshot.val());
            },
            (errorObject) => {
                reject('The read failed: ' + errorObject.code);
            }
        )
    );
    return reservas;
};

const modelGetUser = (userName) => {
    const ref = db.ref('usuarios');
    const usuario = new Promise((resolve, reject) =>
        ref
            .orderByKey()
            .equalTo(userName)
            .on(
                'value',
                (snapshot) => {
                    resolve(snapshot.val());
                },
                (errorObject) => {
                    reject('The read failed: ' + errorObject.code);
                }
            )
    );
    console.log(usuario);
    return usuario;
};

/*
    const user = new Promise((resolve, reject) =>
        ref.on(
            'child_changed',
            function (snapshot, prevChildKey) {
                var nombreUsuario = snapshot.val();
            },
            (errorObject) => {
                reject('The read failed: ' + errorObject.code);
            }
        )
    );
    console.log(nombreUsuario);
    return userName;*/

module.exports = { insertUser, getUser, getUserID, modelGetReservas, modelGetUser };
