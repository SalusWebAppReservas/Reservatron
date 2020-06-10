const db = require('../model/firestoreChart');

exports.getDataForChart = async (req, res) => {
    const { year } = req.params;

    const dataForChart = await db.getDataForYearChart(year);

    return res.json(dataForChart);
};
