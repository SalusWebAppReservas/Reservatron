const dbUsers = require('./firestoreUsers');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendPushNotification = async ({ userID, message }) => {
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
exports.sendEmailtoClient = async ({ userID, message }) => {
    const { userEmail } = await dbUsers.getUser(userID);

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.emailUser,
            pass: process.env.emailPassword,
        },
    });
    try {
        const { accepted } = await transporter.sendMail({
            from: '"Reservatron App" <reservatronapp@hotmail.com>',
            to: `${userEmail}`,
            subject: 'Notificación',
            text: `${message}`,
        });
        if (accepted) return { success: true };
        return { success: false };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};
