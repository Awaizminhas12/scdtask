
const express = require('express');
const router = express.Router();
const carController = require('./carController');

router.post('/cars', carController.createCar);
router.get('/cars/:carId', carController.getCar);
router.put('/cars/:carId', carController.updateCarAvailability); 

module.exports = router;
