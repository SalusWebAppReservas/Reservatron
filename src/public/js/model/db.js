export const getReservas = async (fecha) => {
    try {
        const reservas = await fetch(`/getReservationsDay/${fecha}`);
        return await reservas.json();
    } catch (error) {
        console.log(error);
    }
};

export const getAllClients = async () => {
    try {
        const allClients = await fetch('/getAllUsers');
        return await allClients.json();
    } catch {
        (err) => console.log('error', err);
    }
};

export const saveNewService = async (nameService, durationService, color) => {
    try {
        return await fetch('/addService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nameService, durationService, color }),
        });
    } catch {
        (err) => console.log(err);
        return false;
    }
};

export const getAllServices = async () => {
    try {
        const allServices = await fetch('/getAllServices');
        return await allServices.json();
    } catch {
        (err) => console.log(err);
    }
};

const getHoursReservedDay = async (day) => {
    try {
        return await (await fetch(`/getHoursReservedDay/${day}`)).json();
    } catch (error) {
        console.log(error);
    }
};

export const getAvailableHours = async (day) => {
    const hours = [10, 11, 12, 13, 17, 18, 19, 20];
    const hoursReserved = await getHoursReservedDay(day);
    const date = new Date(day);
    const availableHours = hours.map((hour) => {
        date.setHours(hour);
        return date.getTime();
    });

    return availableHours.filter((hour) => !hoursReserved.includes(hour));
};

export const saveNewReserva = async (reservation) => {
    try {
        await fetch('/addReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation),
        });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};
