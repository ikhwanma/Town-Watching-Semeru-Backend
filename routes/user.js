const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, UserController.getUser)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/verify-code', UserController.verifyCode)
router.post('/resend-code', UserController.resendCode)
router.put('/reset-password', UserController.resetPassword)
router.put('/', authenticate, UserController.updateUser)
router.put('/profile', authenticate, UserController.updateAva)
router.put('/password', authenticate, UserController.updatePassword)

module.exports = router