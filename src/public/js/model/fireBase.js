const url = window.location.href;
const getFirebaseConfig = async () => await (await fetch(`${url}getFirebaseConfig`)).json();

export const connectFirebase = async () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(await getFirebaseConfig());
        firebase.analytics();
    }
};
