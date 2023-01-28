const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const authenticate = require('../middleware/authenticate')

router.post('/comment', authenticate, CommentController.addComment)
router.get('/comment/:id', CommentController.getComment)
router.delete('/comment/:id', authenticate, CommentController.deleteComment)

module.exports = router