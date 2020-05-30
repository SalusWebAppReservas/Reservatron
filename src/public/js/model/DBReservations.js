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
