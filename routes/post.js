const express = require('express')
const router = express.Router()

const PostController = require('../controllers/PostController')
const authenticate = require('../middleware/authenticate')

router.post('/', authenticate, PostController.addPost)
router.get('/', PostController.getAllPost)
router.get('/:id', PostController.getDetailPost)
router.get('/user', authenticate, PostController.getPostUser)
router.delete('/', authenticate, PostController.deletePost)
router.put('/post', authenticate, PostController.updatePost)

module.exports = router