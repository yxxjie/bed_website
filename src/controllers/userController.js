const model = require("../models/userModel.js");

//////////////////////////////////////////////////////
// READ ALL USERS
//////////////////////////////////////////////////////
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

//////////////////////////////////////////////////////
// READ USER BY ITS ID
//////////////////////////////////////////////////////
module.exports.readUserById = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: res.locals.userId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(400).json({
                    message: "User not found"
                });
            }
            else
                res.status(200).json(results[0]);
        }
    };

    model.selectById(data, callback);
}

//////////////////////////////////////////////////////
// CHECK IF USER EXIST
//////////////////////////////////////////////////////
module.exports.checkUser = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: res.locals.userId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error associationCheck:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Ensure req.locals is defined
            if (!req.locals) {
                req.locals = {};
            }
            req.locals.id = results[0].id;
            next();
        }
    };

    model.checkUser(data, callback);
};

//////////////////////////////////////////////////////
// CEHCK IF IT BELONGS TO THE USER TO MODIFY THE USER
//////////////////////////////////////////////////////
module.exports.checkUserBelongsToUser = (req, res, next) => {
    const id = req.locals.id;
    const user_id = res.locals.userId;

    if (!id || !user_id) {
        return res.status(400).json({ message: 'Bad request' });
    }

    if (id != user_id) {
        return res.status(409).json({ message: "You can only view or modify your user! This is not your user!" });
    }
    next();
};

//////////////////////////////////////////////////////
// CHECK IF USERNAME EXIST
//////////////////////////////////////////////////////
module.exports.checkUserNameExist = (req, res, next) => {
    const data = {
        username: req.body.username
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUser:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                // User not found, proceed to the next middleware
                next();
            } else {
                // User found, send the player data as a response
                res.status(409).json({ message: "User has already exist" });
            }
        }
    };

    model.checkUserNameExist(data, callback);
};

//////////////////////////////////////////////////////
// UPDATE THE USER
//////////////////////////////////////////////////////
module.exports.updateUserById = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        id: req.params.id,
        username: req.body.username,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    model.updateById(data, callback);
}

//////////////////////////////////////////////////////
// CHECK POINTS TO CONVERT POINTS TO WALLET
//////////////////////////////////////////////////////
module.exports.checkPoints = (req, res, next) => {
    const data = {
        id: res.locals.userId,
        pointsAmount: parseInt(req.body.pointsAmount)
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error associationCheck:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (results[0].points < data.pointsAmount) {
            res.status(404).json({ message: 'Insufficient Points' });
        } else {

            if (!req.locals) {
                req.locals = {};
            }
            req.locals.id = results[0].id;
            req.locals.pointsAmount = data.pointsAmount,
                req.locals.points = results[0].points,
                req.locals.wallet = results[0].wallet
            next();
        }
    };

    model.checkPoints(data, callback);
};

//////////////////////////////////////////////////////
// CONVERT POINTS INTO MONEY
//////////////////////////////////////////////////////
module.exports.walletConversionById = (req, res, next) => {
    const pointsAmount = Number(req.locals.pointsAmount);
    const points = Number(req.locals.points);
    const wallet = Number(req.locals.wallet);

    if (isNaN(pointsAmount) || isNaN(points) || isNaN(points)) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const data = {
        id: res.locals.userId,
        pointsAmount: pointsAmount,
        points: points,
        wallet: wallet,
        updated_wallet: wallet + (pointsAmount * 50000),
        remaining_points: points - pointsAmount
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error adding energy conversion:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        // Success response
        return res.status(200).json({ message: "Wallet conversion successful", updated_energy: data.updated_energy, remaining_points: data.remaining_points });
    };

    model.walletConversionById(data, callback);
};

//////////////////////////////////////////////////////
// READ CAR BY ID
//////////////////////////////////////////////////////
module.exports.readCarById = (req, res, next) => {
    const carId = req.body.id;

    const data = {
        id: carId, // Use ID from request parameters
        user_id: res.locals.userId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error readWorkoutById:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.locals.cost = results[0].cost;
        res.locals.status_gain = results[0].status_gain;
        res.locals.car_id = results[0].id;
        next();
    };

    model.selectCarById(data, callback);
};

//////////////////////////////////////////////////////
// READ USER BY USER ID
//////////////////////////////////////////////////////
module.exports.readUserByUserId = (req, res, next) => {
    const data = {
        user_id: res.locals.userId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error readUserByUserId:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            console.log("User not found for ID:", data.user_id);
            return res.status(404).json({ message: "User not found" });
        }

        res.locals.wallet = results[0].wallet;
        res.locals.status = results[0].status;
        // Pass along the values previously stored in res.locals
        res.locals.cost = res.locals.cost;
        res.locals.status_gain = res.locals.status_gain;
        res.locals.car_id = res.locals.car_id;
        next();
    };

    model.selectUserByUserId(data, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USER HAS ENOUGH MONEY
//////////////////////////////////////////////////////
module.exports.checkWallet = (req, res, next) => {
    const { wallet, cost } = res.locals;
    if (wallet < cost) {
        return res.status(400).json({ message: 'Insufficient Money' });
    }

    // Set the values in res.locals to ensure they are available for the next middleware
    res.locals.wallet = wallet;
    res.locals.status = res.locals.status;
    res.locals.cost = cost;
    res.locals.status_gain = res.locals.status_gain;
    res.locals.car_id = res.locals.car_id;
    next();
};

//////////////////////////////////////////////////////
// CHECK IF USER HAS ALREADY OWN THE CAR OR NOT
//////////////////////////////////////////////////////
module.exports.checkCarOwnByUser = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
        car_id: res.locals.car_id
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error in checkCarOwnByUser:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        // Check if the car_id is found in the results
        const carOwned = results.some(result => result.car_id === data.car_id);
        
        if (carOwned) {
            return res.status(409).json({ message: "You already own the car" });
        }

        next();
    };

    model.checkCarOwnByUser(data, callback);
};

//////////////////////////////////////////////////////
// UPDATE USER'S STATUS BY USER ID
//////////////////////////////////////////////////////
module.exports.statusConversionById = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
        wallet: res.locals.wallet,
        cost: res.locals.cost,
        status_gain: res.locals.status_gain,
        updated_wallet: res.locals.wallet - res.locals.cost,
        updated_status: res.locals.status + res.locals.status_gain
    };

    const callback = (error) => {
        if (error) {
            console.error("Error adding status conversion:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        updated_wallet = data.updated_wallet,
        updated_status = data.updated_status
    };
    res.locals.car_id = res.locals.car_id;
    next()

    model.statusConversionById(data, callback);
};

//////////////////////////////////////////////////////
// UPDATE THE USER'S CAR COLLECTION
//////////////////////////////////////////////////////
module.exports.carOwnByUser = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
        car_id: res.locals.car_id

    };

    const callback = (error) => {
        if (error) {
            console.error("Error adding strength conversion:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({
            message: "Status conversion successful",
            user_id: data.user_id,
            car_id: data.car_id
        });
    };

    model.carOwnByUser(data, callback);
};

//////////////////////////////////////////////////////
// READ ALL CARS OWNED BY USER
//////////////////////////////////////////////////////
module.exports.readAllCarsByUserId = (req, res, next) => {
    const data = {
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCarsByUserId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(400).json({
                    message: "No cars found for this user"
                });
            } else {
                res.locals.cars = results;
                next();
            }
        }
    };

    model.selectAllCarsByUserId(data, callback);
};

//////////////////////////////////////////////////////
// READ ALL CAR DETAILS BY CAR ID
//////////////////////////////////////////////////////
module.exports.readCarDetailsByCarIds = (req, res) => {
    const carIds = res.locals.cars.map(car => car.car_id);

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCarDetailsByCarIds:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectCarsByIds({ carIds }, callback);
};

//////////////////////////////////////////////////////
// GET POINTS TO DISPLAY
//////////////////////////////////////////////////////
module.exports.getPoints = (req, res, next) => {
    const data = {
        userId: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUsername:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getPoints(data, callback);
}

//////////////////////////////////////////////////////
// GET WALLET TO DISPLAY
//////////////////////////////////////////////////////
module.exports.getWallet = (req, res, next) => {
    const data = {
        userId: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUsername:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getWallet(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Login:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                res.locals.userId = results[0].id
                res.locals.username = results[0].username;
                res.locals.hash = results[0].password;
                next();
            }
        }
    }
    model.login(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash,
        points: 0,
        wallet: 0,
        status: 0
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({ message: "Internal server error." });
        }
        else {
            res.locals.userId = results.insertId
            res.locals.message = "User " + req.body.username + " created successfully."
            next();
        }
    }

    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        return res.status(400).json({ message: "Missing required data." });
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            return res.status(500).json({ message: "Internal server error." });
        } else {
            if (results[0].length != 0) {
                return res.status(409).json({
                    message: "Username or email already exists"
                });
            }

            else if (results[1].length != 0) {
                return res.status(409).json({
                    message: "Username or email already exists"
                });
            }
            else next();
        }
    }

    model.usernameAndEmailCheck(data, callback);
};







