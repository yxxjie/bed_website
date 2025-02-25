const model = require("../models/carModel.js");

//////////////////////////////////////////////////////
// DISPLAY ALL CARS
//////////////////////////////////////////////////////
module.exports.readAllCars = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCars:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}