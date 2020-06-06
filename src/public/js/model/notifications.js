/* global firebase */
import { updateTokensUsers } from './DBUsers.js';

export const webPushInit = async (userID) => {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(
        'BNEqSV0S6P-aSvsX6Zt_u3bjS0BF-B1R9WpvpB5Fl7jwegfvQHbnhtPk5FxhZff1PqrI21m_gGO9yHG9kGlvT_E'
    );

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            await updateTokensUsers(userID, await messaging.getToken());
        }
    } catch (error) {
        console.log(error);
    }

    messaging.onMessage(function (payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        navigator.serviceWorker
            .register('./firebase-messaging-sw.js', { scope: './' })
            .then(function (registration) {
                setTimeout(() => {
                    registration.showNotification(payload.data.title, {
                        body: payload.data.body,
                        data: payload.data.body,
                    });
                    registration.update();
                }, 100);
            })
            .catch(function (err) {
                console.log('Service Worker Failed to Register', err);
            });
    });
};

export const sendPushNotification = async (userID, message) => {
    try {
        const isSentOk = await fetch('/sendPushNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, message }),
        });
        return await isSentOk.json();
    } catch (error) {
        console.log(error);
    }
};

export const sendEmailtoClient = async (userID, message) => {
    try {
        const isSentOk = await fetch('/sendEmailtoClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, message }),
        });
        return await isSentOk.json();
    } catch (error) {
        console.log(error);
    }
};
