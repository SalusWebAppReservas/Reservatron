const { sendPushNotification, sendEmailtoClient } = require('../model/notifications');

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

exports.sendEmailtoClient = async (req, res) => {
    try {
        const result = await sendEmailtoClient(req.body);
        res.json(result);
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};
