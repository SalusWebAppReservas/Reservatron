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

export const getClientes = async (nombreCliente) => {
    //Hacer un fetch al servidor para obtener todos los clientes que empiezen por el contenido de nombre Cliente.
    return nombreCliente;
};
