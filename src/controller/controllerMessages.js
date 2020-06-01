const { sendPushNotification } = require('../model/firebasePushNotifications');

exports.sendPushNotification = async (req, res) => {
    try {
        const result = await sendPushNotification(req.body);
        if (result) res.json(result);
        else res.json({ success: 'no tokens' });
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};
