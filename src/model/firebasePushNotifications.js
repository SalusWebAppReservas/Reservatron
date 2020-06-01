const dbUsers = require('./firestoreUsers');

exports.sendPUshNotification = async ({ userID, message }) => {
    const { webPushTokens } = await dbUsers.getUser(userID);

    const admin = require('firebase-admin');

    const msg = {
        notification: {
            title: 'Reservatron',
            body: message,
        },
        data: {
            title: 'Reservatron',
            body: message,
        },
    };
    let result;
    if (webPushTokens) {
        result = Promise.all(
            webPushTokens.map(async (token) => {
                const sent = await admin.messaging().sendToDevice(token, msg);
                return sent;
            })
        );

        let enviados = {};
        enviados.success = 0;
        enviados.fail = 0;
        (await result).forEach((result) => {
            enviados['success'] += Number(result.successCount);
            enviados['fail'] += Number(result.failureCount);
        });

        return enviados;
    }
};
