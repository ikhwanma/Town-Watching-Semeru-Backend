const express = require('express')
const router = express.Router()

const LikeController = require('../controllers/LikeController')
const authenticate = require('../middleware/authenticate')

router.post('/like/:id', authenticate, LikeController.addLike)
router.get('/like/:id', authenticate, LikeController.getLike)
router.get('/like', authenticate, LikeController.getPostLike)

module.exports = router