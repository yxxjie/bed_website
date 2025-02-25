
const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const jwtMiddleware= require('../middlewares/jwtMiddleware');

router.get('/', controller.readAllUser);
router.get('/:id', controller.readUserById);

router.put('/:id', jwtMiddleware.verifyToken, controller.checkUser, controller.checkUserBelongsToUser, controller.checkUserNameExist, controller.updateUserById);
router.put('/:id/money', jwtMiddleware.verifyToken, controller.checkUser, controller.checkUserBelongsToUser, controller.checkPoints, controller.walletConversionById);

router.put('/token/car', jwtMiddleware.verifyToken, controller.readCarById, controller.readUserByUserId, controller.checkWallet, controller.checkCarOwnByUser, controller.statusConversionById, controller.carOwnByUser);

router.get('/:id/car', controller.readAllCarsByUserId, controller.readCarDetailsByCarIds);

router.get('/survey/points', jwtMiddleware.verifyToken, controller.getPoints);
router.get('/car/wallet', jwtMiddleware.verifyToken, controller.getWallet);
module.exports = router;
