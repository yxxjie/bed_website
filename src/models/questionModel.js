const pool = require('../services/db');

//////////////////////////////////////////////////////
// CREATE NEW QUESTION
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO "Question" (question, creator_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const VALUES = [data.question, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ ALL QUESTIONS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `SELECT * FROM "Question";`;
    pool.query(SQLSTATEMENT, callback);
};

//////////////////////////////////////////////////////
// READ QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "Question"
    WHERE question_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK WHETHER QUESTION EXISTS WHILE RETRIEVING DATA
//////////////////////////////////////////////////////
module.exports.selectByQuestionId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "Question"
    WHERE question_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "Question"
    SET question = $1, updated_on = CURRENT_TIMESTAMP
    WHERE question_id = $2
    RETURNING *;
    `;
    const VALUES = [data.question, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// DELETE QUESTION & ANSWERS BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    BEGIN;
    DELETE FROM "Answer" WHERE answered_question_id = $1;
    DELETE FROM "Question" WHERE question_id = $1;
    COMMIT;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CREATE AN ANSWER FOR A SPECIFIC QUESTION
//////////////////////////////////////////////////////
module.exports.insertNewAnswer = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO "Answer" (answered_question_id, participant_id, answer, additional_notes)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const VALUES = [data.question_id, data.user_id, data.answer, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// ADD 5 POINTS TO USER WHEN QUESTION IS ANSWERED
//////////////////////////////////////////////////////
module.exports.addPoints = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "User"
    SET points = points + 5
    WHERE id = $1
    RETURNING *;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ ALL ANSWERS BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.selectAnswerById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "Answer"
    WHERE answered_question_id = $1;
    `;
    const VALUES = [data.question_id];

    console.log("Executing query:", SQLSTATEMENT);
    console.log("With values:", VALUES);

    pool.query(SQLSTATEMENT, VALUES, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};
