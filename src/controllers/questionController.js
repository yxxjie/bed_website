const model = require("../models/questionModel.js");

//////////////////////////////////////////////////////
// CREATE NEW QUESTION
//////////////////////////////////////////////////////
module.exports.createNewQuestion = (req, res, next) => {
    if (req.body.question == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const data = {
        question: req.body.question,
        user_id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({ message: "Internal server error." });
        }
        else {
            res.locals.question = results.question,
                res.locals.user_id = results.user_id
            res.status(201).json({ message: 'Question Created' })
        }
    }

    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// READ ALL QUESTIONS
//////////////////////////////////////////////////////
module.exports.readAllQuestion = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuestion:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

//////////////////////////////////////////////////////
// READ QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.readQuestionById = (req, res, next) => {
    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Question not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

//////////////////////////////////////////////////////
// CHECK WHETHER QUESTION EXIST WHILE RETRIEVING DATA
//////////////////////////////////////////////////////
module.exports.checkQuestion = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: res.locals.userId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error associationCheck:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Question not found' });
        } else {
            // Ensure req.locals is defined
            if (!req.locals) {
                req.locals = {};
            }
            req.locals.creator_id = results[0].creator_id;
            next();
        }
    };

    model.selectByQuestionId(data, callback);
};

//////////////////////////////////////////////////////
// CHECK WHETHER THE QUESTION BELONGS TO USER(CREATOR)
//////////////////////////////////////////////////////
module.exports.checkQuestionBelongsToUser = (req, res, next) => {
    const creator_id = req.locals.creator_id;
    const user_id = res.locals.userId;

    if (!creator_id || !user_id) {
        return res.status(400).json({ message: 'Bad request' });
    }

    if (creator_id != user_id) {
        return res.status(409).json({ message: "You can only modify or delete your question! This is not your question!" });
    }
    next();
};

//////////////////////////////////////////////////////
// UPDATE QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.updateQuestionById = (req, res, next) => {
    if (req.body.question == undefined) {
        res.status(400).json({
            message: "Error: Question is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        question: req.body.question,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatereviewById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Review not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    model.updateById(data, callback);
}

//////////////////////////////////////////////////////
// DELETE QUESTION BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.deleteQuestionById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    req.locals.question_id = data.id

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send(); // 204 No Content 
            next();
        }
    }

    model.deleteById(data, callback);
}

//////////////////////////////////////////////////////
// CREATE AN ANSWER FOR A SPECIFIC QUESTION
//////////////////////////////////////////////////////
module.exports.createAnswer = (req, res, next) => {
    const data = {
        question_id: req.body.question_id,
        user_id: res.locals.userId,
        answer: req.body.answer,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createAnswer:", error);
            res.status(500).json(error);
        } else
            next();
    }

    model.insertNewAnswer(data, callback);
}

//////////////////////////////////////////////////////
// ADD 5 POINTS TO USER WHEN QUESTION IS ANSWERED
//////////////////////////////////////////////////////
module.exports.addPoints = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPoints:", error);
            res.status(500).json(error);
        } else
            res.status(201).json({ message: "Points Added" });
    }

    model.addPoints(data, callback);
}

//////////////////////////////////////////////////////
// READ ALL ANSWERS BY QUESTION ID
//////////////////////////////////////////////////////
module.exports.readAnswerByQuestionId = (req, res, next) => {
    const data = {
        question_id: req.params.question_id,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error retrieving answers:", error);
            res.status(500).json({ error: "An error occurred while retrieving answers." });
        } else {
            if (results.length == 0) {
                res.status(404).json({ message: "No answers available" });
            } else {
                results.rows.forEach(result => {
                    result.answer = result.answer === 1; // Convert 1 to true, everything else to false
                });
                res.status(200).json(results);
            }
        }
    };

    model.selectAnswerById(data, callback);
};

