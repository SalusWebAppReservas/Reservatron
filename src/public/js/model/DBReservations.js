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

export const modifyReservation = async (reservationID, date) => {
    try {
        const isModifyOK = await fetch('/modifyReservation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationID, date }),
        });
        return await isModifyOK.json();
    } catch (error) {
        console.log(error);
    }
};
