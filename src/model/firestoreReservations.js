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
        return reservations.docs.map((hour) => hour.data());
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
    console.log(reservationID, date);

    try {
        await db.doc(reservationID).set({ date: Number(date) }, { merge: true });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};
