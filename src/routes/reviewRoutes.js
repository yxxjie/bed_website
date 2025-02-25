const express = require('express');
const router = express.Router();
const jwtMiddleware= require('../middlewares/jwtMiddleware');
const controller = require('../controllers/reviewController');

router.post('/', jwtMiddleware.verifyToken, controller.createReview);
router.get('/:id', controller.readReviewById);
router.get('/', controller.readAllReview);



router.put('/:id', jwtMiddleware.verifyToken, controller.reviewUserCheck, controller.updateReviewById);
router.delete('/:id', jwtMiddleware.verifyToken, controller.reviewUserCheck, controller.deleteReviewById);

module.exports = router;