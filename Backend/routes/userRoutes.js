const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get-profile/:id', userController.getProfile);
router.put('/update-profile', userController.updateProfile);

module.exports = router;
