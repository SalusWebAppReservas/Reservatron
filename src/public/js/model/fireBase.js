const url = window.location.href;

/* Si de da a volver en medio de una autenticación firebase añade ?mode=select en la url
y hace fallar el fetch que se basa en la url,
con el regex del split borramos lo que hay detras de la / pero sin borrar
las dos primeras barras http://localhost:3000/?mode=select

let [url, urlToDelete] = fullUrl.split(/(?<!:)(?<!\/)\//g);
regex lockhead no es soportado por firefox ni ios
 así que uso alternativa de dividirla url en 4 partes
*/

let [part1, part2, part3, part4] = url.split('/');

if (part4) {
    window.location.replace(`${part1}//${part3}/`);
}

const getFirebaseConfig = async () => await (await fetch(`${url}getFirebaseConfig`)).json();

export const connectFirebase = async () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(await getFirebaseConfig());
        firebase.analytics();
    }
};
