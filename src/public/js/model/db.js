export const getReservas = async (fecha) => {
    const url = window.location.href;
    const reservas = await fetch(`${url}getReservas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatison/json',
        },
        body: JSON.stringify(fecha),
    });
    const reservasJson = await reservas.json();
    return Object.values(reservasJson);
};

export const getAllClients = async () => {
    const url = window.location.href;

    try {
        const allClients = await fetch(`${url}getAllUsers`);
        return await allClients.json();
    } catch {
        (err) => console.log('error', err);
    }
};

export const saveNewService = async (nameService, durationService, color) => {
    const url = window.location.href;
    try {
        return await fetch(`${url}addService`, {
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
    const url = window.location.href;
    try {
        const allServices = await fetch(`${url}getAllServices`);
        return await allServices.json();
    } catch {
        (err) => console.log(err);
    }
};
