const express = require('express')
const router = express.Router()

const CategoryUserController = require('../controllers/CategoryUserController')

router.post('/category', CategoryUserController.addCategoryUser)
router.get('/category/', CategoryUserController.getCategoryUser)

module.exports = router