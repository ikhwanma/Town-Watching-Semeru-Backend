const express = require('express')
const router = express.Router()

const PostController = require('../controllers/PostController')
const authenticate = require('../middleware/authenticate')

router.get('/user', authenticate, PostController.getPostUser)
router.post('/', authenticate, PostController.addPost)
router.get('/', PostController.getAllPost)
router.get('/:id', PostController.getDetailPost)
router.get('/filter/category/:id', PostController.getPostByCategory)
router.delete('/user/:id', authenticate, PostController.deletePost)
router.put('/', authenticate, PostController.updatePost)

module.exports = router