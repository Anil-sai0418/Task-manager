const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/toggle-like', likeController.toggleLike);
router.get('/total-likes', likeController.getTotalLikes);
router.post('/check-user-like', likeController.checkUserLike);
router.get('/like-stats', likeController.getLikeStats);

module.exports = router;
