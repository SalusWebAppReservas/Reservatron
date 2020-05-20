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
