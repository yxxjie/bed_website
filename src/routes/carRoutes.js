const express = require('express');
const router = express.Router();

const controller = require('../controllers/carController');

router.get('/', controller.readAllCars);


module.exports = router;