export const getReservasMonth = async (firstDay, lastDay) => {
    try {
        const reservas = await fetch('/getReservasMonth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstDay, lastDay }),
        });
        return await reservas.json();
    } catch (error) {
        console.log(error);
    }
};

export const deleteReservation = async (reservationID) => {
    try {
        const isDeleteOK = await fetch('/deleteReservation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationID }),
        });
        return await isDeleteOK.json();
    } catch (error) {
        console.log(error);
    }
};
