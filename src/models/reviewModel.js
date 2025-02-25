const pool = require('../services/db');

//////////////////////////////////////////////////////
// CREATE NEW REVIEW
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Reviews (rating_amt, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.rating_amt, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Reviews
    WHERE review_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ ALL REVIEWS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Reviews
    INNER JOIN user ON user.id = Reviews.user_id;
    `;

    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// CHECK IF THE USER ID AND CREATOR ID MATCH
//////////////////////////////////////////////////////
module.exports.selectByReviewId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Reviews
    WHERE review_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Reviews 
    SET rating_amt = ?
    WHERE review_id = ?;
    `;
    const VALUES = [data.rating_amt, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Reviews 
    WHERE review_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
