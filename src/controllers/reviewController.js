const model = require("../models/reviewModel.js");
const pool = require("../services/db.js");

//////////////////////////////////////////////////////
// CREATE NEW REVIEW
//////////////////////////////////////////////////////
module.exports.createReview = (req, res, next) => {
    if (req.body.rating_amt == undefined) {
        res.status(400).send({ message: "review_amt is undefined" });
        return;
    }
    else if (req.body.review_amt > 5 || req.body.rating_amt < 1) {
        res.status(400).json({ message: "review_amt can only be between 1 to 5" });
        return;
    }
    else if (res.locals.userId == undefined) {
        res.status(400).send({ message: "user_id is undefined" });
        return;
    }

    const data = {
        user_id: res.locals.userId,
        rating_amt: req.body.rating_amt
    }

    console.log("data", data);

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({ message: "Review success" });
        }
    }

    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// READ REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.readReviewById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readReviewById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Review not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

//////////////////////////////////////////////////////
// READ ALL REVIEWS
//////////////////////////////////////////////////////
module.exports.readAllReview = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllReview:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

//////////////////////////////////////////////////////
// CHECK IF THE USER ID AND CREATOR ID MATCH
//////////////////////////////////////////////////////
module.exports.reviewUserCheck = (req, res, next) => {

    if(req.params.id == undefined)
        {
            res.status(400).send("Error: id is undefined");
            return;
        }

    const data = {
        id: req.params.id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questionUserCheck:", error);
            res.status(500).json(error);
        } else {
            if (results[0].user_id != res.locals.userId) {
                res.status(403).json({
                    message: "You can only edit or delete your review. This is not your review."
                });
            }
            else next();
        }
    }

    model.selectByReviewId(data, callback);
}

//////////////////////////////////////////////////////
// UPDATE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.updateReviewById = (req, res, next) => {
    if (req.body.rating_amt == undefined) {
        res.status(400).send("Error: review_amt is undefined");
        return;
    }
    else if (req.body.rating_amt > 5 || req.body.rating_amt < 1) {
        res.status(400).send("Error: review_amt can only be between 1 to 5");
        return;
    }

    const data = {
        id: req.params.id,
        rating_amt: req.body.rating_amt
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateReviewById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send();
        }
    }

    model.updateById(data, callback);
}

//////////////////////////////////////////////////////
// DELETE REVIEW BY REVIEW ID
//////////////////////////////////////////////////////
module.exports.deleteReviewById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteReviewById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Review not found"
                });
            }
            else {
                res.status(204).send();
            }
        }
    }

    model.deleteById(data, callback);
}