
const express = require('express');
const router = express.Router();

const controller = require('../controllers/questionController');
const jwtMiddleware= require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware.verifyToken, controller.createNewQuestion);
router.get('/', controller.readAllQuestion);
router.get('/:question_id', controller.readQuestionById)

router.put('/:id', jwtMiddleware.verifyToken, controller.checkQuestion, controller.checkQuestionBelongsToUser, controller.updateQuestionById);
router.delete('/:id', jwtMiddleware.verifyToken, controller.checkQuestion, controller.checkQuestionBelongsToUser, controller.deleteQuestionById);

router.post('/token/:question_id/answer', jwtMiddleware.verifyToken, controller.createAnswer, controller.addPoints);
router.get('/:question_id/answer', controller.readAnswerByQuestionId);

module.exports = router;