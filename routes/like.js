const express = require('express')
const router = express.Router()

const LikeController = require('../controllers/LikeController')
const authenticate = require('../middleware/authenticate')

router.post('/like', authenticate, LikeController.addLike)

module.exports = router