const pool = require('../services/db');

//////////////////////////////////////////////////////
// DISPLAY ALL CARS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Car;
    `;

    pool.query(SQLSTATMENT, callback);
}