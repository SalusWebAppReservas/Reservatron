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
    console.log('get');
    const url = window.location.href;

    try {
        return await (await fetch(`${url}getAllUsers`)).json();
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
        await fetch(`${url}getAllServices`);
    } catch {
        (err) => console.log(err);
    }
};
