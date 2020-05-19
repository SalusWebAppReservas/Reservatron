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

const insertReserva = () => {
    const db = admin.database();
    const ref = db.ref('reservas');
    const reservas = [
        {
            serviceID: '-Afasf34fasdfFASfs3',
            serviceName: 'Masaje deportivo',
            date: '1213123134565131', //fecha salvada en formato misilegundos en DB
            day: 'Hoy', //Calcular ei es hoy
            time: '11:30', //Sacar la hora y minutos de date
            userID: '-M7WqbYa00JPQqRKDLxQ',
            userName: 'Pedro',
            userSurnames: 'García Fajardo',
        },
        {
            serviceID: '-Afasf34fas11FASfs3',
            serviceName: 'Masaje descontracturante completo',
            date: '1213123134565131', //fecha salvada en formato misilegundos
            day: 'Mañana',
            time: '11:30',
            userID: '-M7WqbYavLJ88qRKDLxQ',
            userName: 'Lucía',
            userSurnames: 'Domínguez Blanco',
        },
        {
            serviceID: '-Afasf22fasdfFASfs3',
            serviceName: 'Masaje de espalda',
            date: '1213123134565131', //fecha salvada en formato misilegundos
            day: '20/05/2020',
            time: '11:30',
            userID: '-M7WqbYavLJPQ77KDLxQ',
            userName: 'Sonia',
            userSurnames: 'Miralles Pallarés',
        },
        {
            serviceID: '-Afasf34f33dfFASfs3',
            serviceName: 'Masaje antiestrés',
            date: '1213123134565131', //fecha salvada en formato misilegundos
            day: '21/05/2020',
            time: '11:30',
            userID: '-M7WqbYavL66QqRKDLxQ',
            userName: 'Mario',
            userSurnames: 'Soria Pacheco',
        },
        {
            serviceID: '-Afasf3444sdfFASfs3',
            serviceName: 'Masaje anticelulítico',
            date: '1213123134565131', //fecha salvada en formato misilegundos
            day: '21/05/2020',
            time: '11:30',
            userID: '-M7WqbYavL55QqRKDLxQ',
            userName: 'Carmen',
            userSurnames: 'Pons Flors',
        },
    ];
    const isSaveOk = new Promise((resolve) =>
        reservas.forEach(
            (reserva) => ref.push(reserva),
            (error) => (error ? resolve(false) : resolve(true))
        )
    );
    return isSaveOk;
};

module.exports = { insertUser, getUser, getUserID, insertReserva };
