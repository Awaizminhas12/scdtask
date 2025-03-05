
const express = require('express');
const router = express.Router();
const userController = require('./usercontroller');

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUser);
router.put('/users/:userId', userController.updateUserBookings); 

module.exports = router;
