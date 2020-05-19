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
    console.log(reservasJson);
    return reservasJson;
    //     const reservas = [
    //         {
    //             serviceID: '-Afasf34fasdfFASfs3',
    //             serviceName: 'Masaje deportivo',
    //             date: '1213123134565131', //fecha salvada en formato misilegundos en DB
    //             day: 'Hoy', //Calcular ei es hoy
    //             time: '11:30', //Sacar la hora y minutos de date
    //             userID: '-M7WqbYa00JPQqRKDLxQ',
    //             userName: 'Javier',
    //             userSurnames: 'García Fajardo',
    //         },
    //         {
    //             serviceID: '-Afasf34fas11FASfs3',
    //             serviceName: 'Masaje descontracturante completo',
    //             date: '1213123134565131', //fecha salvada en formato misilegundos
    //             day: 'Mañana',
    //             time: '11:30',
    //             userID: '-M7WqbYavLJ88qRKDLxQ',
    //             userName: 'Lucía',
    //             userSurnames: 'Domínguez Blanco',
    //         },
    //         {
    //             serviceID: '-Afasf22fasdfFASfs3',
    //             serviceName: 'Masaje de espalda',
    //             date: '1213123134565131', //fecha salvada en formato misilegundos
    //             day: '20/05/2020',
    //             time: '11:30',
    //             userID: '-M7WqbYavLJPQ77KDLxQ',
    //             userName: 'Sonia',
    //             userSurnames: 'Miralles Pallarés',
    //         },
    //         {
    //             serviceID: '-Afasf34f33dfFASfs3',
    //             serviceName: 'Masaje antiestrés',
    //             date: '1213123134565131', //fecha salvada en formato misilegundos
    //             day: '21/05/2020',
    //             time: '11:30',
    //             userID: '-M7WqbYavL66QqRKDLxQ',
    //             userName: 'Mario',
    //             userSurnames: 'Soria Pacheco',
    //         },
    //         {
    //             serviceID: '-Afasf3444sdfFASfs3',
    //             serviceName: 'Masaje anticelulítico',
    //             date: '1213123134565131', //fecha salvada en formato misilegundos
    //             day: '21/05/2020',
    //             time: '11:30',
    //             userID: '-M7WqbYavL55QqRKDLxQ',
    //             userName: 'Carmen',
    //             userSurnames: 'Pons Flors',
    //         },
    //     ];
    //     return reservas;
};
