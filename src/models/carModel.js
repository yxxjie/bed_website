const pool = require('../services/db');

//////////////////////////////////////////////////////
// DISPLAY ALL CARS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "car";
    `;

    pool.query(SQLSTATEMENT, [], callback);
};
