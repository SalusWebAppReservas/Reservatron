const dbUsers = require('./firestoreUsers');
const nodemailer = require('nodemailer');

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
async function main({ email, message }) {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Admin" <foo@example.com>',
        to: `${email}`,
        subject: "Reservatron",
        text: `${message}`,
        //html: "<b>Hello world?</b>",
    });
}

main().catch(console.error);