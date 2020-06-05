const DBUsers = require('./firestoreUsers');
const DBReservations = require('./firestoreReservations');

exports.getDataForYearChart = async (year) => {
    const { registeredUsers, totalUsers } = await DBUsers.getDataForYearChart(year);

    const {
        reservationsDone,
        topClients,
        totalReservas,
    } = await DBReservations.getDataForYearChart(year);

    //Get fullName for userID
    const topClient = Promise.all(
        topClients.map(async (client) => {
            if (Object.keys(client) == '') return client;
            const { userName, userSurnames } = await DBUsers.getUser(Object.keys(client)[0]);
            return { [`${userName} ${userSurnames}`]: client[Object.keys(client)] };
        })
    );

    return {
        registeredUsers,
        totalUsers,
        reservationsDone,
        totalReservas,
        topClient: await topClient,
    };
};
