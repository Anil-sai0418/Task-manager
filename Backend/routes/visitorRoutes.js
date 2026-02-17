const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.post('/register-visitor', visitorController.registerVisitor);
router.get('/visitor-count', visitorController.getVisitorCount);
router.get('/visitor-stats', visitorController.getVisitorStats);

module.exports = router;
