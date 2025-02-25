const pool = require('../services/db');

//////////////////////////////////////////////////////
// READ ALL USERS
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User";`;
    pool.query(SQLSTATEMENT, callback);
};

//////////////////////////////////////////////////////
// READ USER BY ITS ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE id = $1;`;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USER EXISTS
//////////////////////////////////////////////////////
module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE id = $1;`;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USERNAME EXISTS
//////////////////////////////////////////////////////
module.exports.checkUserNameExist = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE username = $1;`;
    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE THE USER
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "User" SET username = $1 WHERE id = $2 RETURNING *;
    `;
    const VALUES = [data.username, data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK POINTS TO CONVERT POINTS TO WALLET
//////////////////////////////////////////////////////
module.exports.checkPoints = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE id = $1;`;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CONVERT POINTS INTO MONEY
//////////////////////////////////////////////////////
module.exports.walletConversionById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "User" SET wallet = $1, points = $2 WHERE id = $3 RETURNING *;
    `;
    const VALUES = [data.updated_wallet, data.remaining_points, data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ CAR BY ID
//////////////////////////////////////////////////////
module.exports.selectCarById = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "Car" WHERE id = $1;`;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// READ USER BY USER ID
//////////////////////////////////////////////////////
module.exports.selectUserByUserId = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE id = $1;`;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USER ALREADY OWNS THE CAR
//////////////////////////////////////////////////////
module.exports.checkCarOwnByUser = (data, callback) => {
    const SQLSTATEMENT = `SELECT car_id FROM "CarOwnByUser" WHERE owner_id = $1;`;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// UPDATE USER'S STATUS
//////////////////////////////////////////////////////
module.exports.statusConversionById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE "User" SET wallet = $1, status = $2 WHERE id = $3 RETURNING *;
    `;
    const VALUES = [data.updated_wallet, data.updated_status, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// ADD CAR TO USER'S COLLECTION
//////////////////////////////////////////////////////
module.exports.carOwnByUser = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO "CarOwnByUser" (owner_id, car_id) VALUES ($1, $2) RETURNING *;
    `;
    const VALUES = [data.user_id, data.car_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// GET ALL CARS OWNED BY USER
//////////////////////////////////////////////////////
module.exports.selectAllCarsByUserId = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "CarOwnByUser" WHERE owner_id = $1;`;
    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// GET ALL CAR DETAILS BY MULTIPLE CAR IDS
//////////////////////////////////////////////////////
module.exports.selectCarsByIds = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "Car" WHERE id = ANY($1);`;
    const VALUES = [data.carIds];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// GET USER'S POINTS
//////////////////////////////////////////////////////
module.exports.getPoints = (data, callback) => {
    const SQLSTATEMENT = `SELECT points FROM "User" WHERE id = $1;`;
    const VALUES = [data.userId];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// GET USER'S WALLET BALANCE
//////////////////////////////////////////////////////
module.exports.getWallet = (data, callback) => {
    const SQLSTATEMENT = `SELECT wallet FROM "User" WHERE id = $1;`;
    const VALUES = [data.userId];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// LOGIN CONTROLLER
//////////////////////////////////////////////////////
module.exports.login = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM "User" WHERE username = $1;`;
    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// REGISTER NEW USER
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO "User" (username, email, password, points, wallet, status)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const VALUES = [data.username, data.email, data.password, data.points, data.wallet, data.status];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.usernameAndEmailCheck = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "User" WHERE username = $1
    UNION
    SELECT * FROM "User" WHERE email = $2;
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATEMENT, VALUES, callback);
};
