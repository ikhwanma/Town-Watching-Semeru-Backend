const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')

//router.put('/', authenticate, UserController.updateUser)
router.get('/', authenticate, UserController.getUser)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router