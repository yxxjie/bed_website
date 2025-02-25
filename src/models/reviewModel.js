const pool = require('../services/db');

//////////////////////////////////////////////////////
// CREATE NEW REVIEW
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO "reviews" (rating_amt, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const VALUES = [data.rating_amt, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "reviews"
    WHERE review_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ ALL REVIEWS WITH USER DETAILS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT "reviews".*, "User".username, "User".email 
    FROM "reviews"
    INNER JOIN "User" ON "User".id = "Reviews".user_id;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//////////////////////////////////////////////////////
// CHECK IF THE USER ID AND CREATOR ID MATCH
//////////////////////////////////////////////////////
module.exports.selectByReviewId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "reviews"
    WHERE review_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "reviews" 
    SET rating_amt = $1
    WHERE review_id = $2
    RETURNING *;
    `;
    const VALUES = [data.rating_amt, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// DELETE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM "reviews" 
    WHERE review_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
