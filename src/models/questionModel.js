const pool = require('../services/db');

//////////////////////////////////////////////////////
// CREATE NEW QUESTION
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Question (question, creator_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.question, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ ALL QUESTIONS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Question;
    `;

    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// READ QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Question
    WHERE question_id = ?;
            `;
    const VALUES = [data.id]
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CHECK WHETHER QUESTION EXIST WHILE RETRIEVING DATA
//////////////////////////////////////////////////////
module.exports.selectByQuestionId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Question
    WHERE question_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Question
    SET question = ?
    WHERE question_id = ?;
    `;
    const VALUES = [data.question, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Question
    WHERE question_id = ?;

    DELETE FROM Answer
    WHERE answered_question_id = ?;
    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CREATE AN ANSWER FOR A SPECIFIC QUESTION
//////////////////////////////////////////////////////
module.exports.insertNewAnswer = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Answer (answered_question_id, participant_id, answer, additional_notes)
    VALUES(?, ?, ?, ?);
    `;
    const VALUES = [data.question_id, data.user_id, data.answer, data.notes];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// ADD 5 POINTS TO USER WHEN QUESTION IS ANSWERED
//////////////////////////////////////////////////////
module.exports.addPoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User
    SET points = points +5
    WHERE id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ ALL ANSWERS BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.selectAnswerById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Answer
    WHERE answered_question_id = ?;
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
