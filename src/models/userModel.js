const pool = require('../services/db');

//////////////////////////////////////////////////////
// READ ALL USERS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// READ USER BY ITS ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CHECK IF USER EXIST
//////////////////////////////////////////////////////
module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USERNAME EXIST
//////////////////////////////////////////////////////
module.exports.checkUserNameExist = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE THE USER
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User
    SET username = ?
    WHERE id = ?;
    `;
    const VALUES = [data.username, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CHECK POINTS TO CONVERT POINTS TO WALLET
//////////////////////////////////////////////////////
module.exports.checkPoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CONVERT POINTS INTO MONEY
//////////////////////////////////////////////////////
module.exports.walletConversionById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User
    SET wallet = ?
    WHERE id = ?;

    UPDATE User
    SET points = ?
    WHERE id = ?;
    `;
    const VALUES = [data.updated_wallet, data.id, data.remaining_points, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ CAR BY ID
//////////////////////////////////////////////////////
module.exports.selectCarById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Car
    WHERE id = ?;
    `;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ USER BY USER ID
//////////////////////////////////////////////////////
module.exports.selectUserByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USER HAS ALREADY OWN THE CAR OR NOT
//////////////////////////////////////////////////////
module.exports.checkCarOwnByUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT car_id FROM CarOwnByUser
    WHERE owner_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE USER'S STATUS BY USER ID
//////////////////////////////////////////////////////
module.exports.statusConversionById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET wallet = ?, status = ?
    WHERE id = ?;
    `;
    const VALUES = [data.updated_wallet, data.updated_status, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE THE USER'S CAR COLLECTION
//////////////////////////////////////////////////////
module.exports.carOwnByUser = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO CarOwnByUser (owner_id, car_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.user_id, data.car_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ ALL CARS OWNED BY USER
//////////////////////////////////////////////////////
module.exports.selectAllCarsByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM CarOwnByUser
    WHERE owner_id = ?;
    `;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// READ ALL CAR DETAILS BY CAR ID
//////////////////////////////////////////////////////
module.exports.selectCarsByIds = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Car
    WHERE id IN (?);
    `;
    const VALUES = [data.carIds];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// GET POINTS TO DISPLAY
//////////////////////////////////////////////////////
module.exports.getPoints = (data, callback) => {
    const SQLSTATMENT = `
        SELECT points FROM User
        WHERE id = ?;
        `;
    const VALUES = [data.userId];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// GET WALLET TO DISPLAY
//////////////////////////////////////////////////////
module.exports.getWallet = (data, callback) => {
    const SQLSTATMENT = `
        SELECT wallet FROM User
        WHERE id = ?;
        `;
    const VALUES = [data.userId];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password, points, wallet, status)
    VALUES (?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password, data.points, data.wallet, data.status];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.usernameAndEmailCheck = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;

    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}


