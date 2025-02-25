const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const carRoutes = require('./carRoutes')
const reviewRoutes = require('./reviewRoutes')

const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController')

router.use("/user", userRoutes);
router.use("/question", questionRoutes);
router.use("/car", carRoutes);
router.use("/review", reviewRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;