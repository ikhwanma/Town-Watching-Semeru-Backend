const express = require('express')
const router = express.Router()

const CategoryController = require("../controllers/CategoryController")

router.get('/category', CategoryController.getCategory)
router.get('/category/:id', CategoryController.getCategoryById)
router.post('/category', CategoryController.addCategory)

module.exports = router