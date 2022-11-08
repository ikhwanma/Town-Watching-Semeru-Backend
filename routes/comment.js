const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')

router.post('/comment', CommentController.addComment)

module.exports = router