const { initFirestore } = require('./firestore');
const admin = require('firebase-admin');

if (admin.apps.length === 0) initFirestore();

const db = admin.firestore().collection('reservations');

exports.addReservation = async (reservation) => {
    try {
        await db.doc().set(reservation, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.getHoursReservedDay = async (day) => {
    const nextDay = new Date(Number(day));
    nextDay.setDate(nextDay.getDate() + 1);
    try {
        const hoursReserved = await db
            .where('date', '>', Number(day))
            .where('date', '<', Number(nextDay.getTime()))
            .get();
        return hoursReserved.docs.map((hour) => hour.data().date);
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.getReservationsDay = async (day) => {
    const nextDay = new Date(Number(day));
    nextDay.setDate(nextDay.getDate() + 1);
    try {
        const reservations = await db
            .where('date', '>', Number(day))
            .where('date', '<', Number(nextDay.getTime()))
            .get();
        return reservations.docs.map((hour) => {
            return { ...hour.data(), reservationID: hour.id };
        });
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.getReservasMonth = async ({ firstDay, lastDay }) => {
    try {
        const reservations = await db
            .where('date', '>=', Number(firstDay))
            .where('date', '<=', Number(lastDay))
            .get();
        return reservations.docs.map((hour) => {
            return { ...hour.data(), reservationID: hour.id };
        });
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.deleteReservation = async ({ reservationID }) => {
    try {
        await db.doc(reservationID).delete();
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.modifyReservation = async ({ reservationID, date }) => {
    try {
        await db.doc(reservationID).set({ date: Number(date) }, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

exports.getDataForYearChart = async (year) => {
    const firstDay = new Date(year, 0, 1).getTime();
    const lastDay = new Date(Number(year) + 1, 0, 0).getTime();
    const reservas = await db.where('date', '>=', firstDay).where('date', '<=', lastDay).get();
    let reservationsDone = Array(12)
        .fill({})
        .map((e, index) => {
            return { [new Date(year, index).toLocaleString('es-ES', { month: 'long' })]: 0 };
        });
    let topClientByMonth = Array(12).fill({});

    reservas.docs.forEach((reserva) => {
        const { date, clientID } = reserva.data();

        const monthName = new Date(Number(date)).toLocaleDateString('es-ES', { month: 'long' });
        const monthNumber = new Date(Number(date)).getMonth();

        reservationsDone[monthNumber][monthName] === 0
            ? (reservationsDone[monthNumber][monthName] = 1)
            : (reservationsDone[monthNumber][monthName] += 1);

        const contador = Object.keys(topClientByMonth[monthNumber]).includes(clientID)
            ? (topClientByMonth[monthNumber][clientID] += 1)
            : 1;

        topClientByMonth[monthNumber] = { ...topClientByMonth[monthNumber], [clientID]: contador };
    });
    const topClients = topClientByMonth.map((client) => {
        const max = Object.values(client).length > 0 ? Math.max.apply(0, Object.values(client)) : 0;
        let empate = false;
        return {
            [Object.keys(client).filter((id) => {
                if (client[id] === max) {
                    if (empate) return false;
                    empate = true;
                }
                return client[id] === max;
            })]: max,
        };
    });

    const totalReservas = reservas.docs.length;

    return { reservationsDone, topClients, totalReservas };
};
