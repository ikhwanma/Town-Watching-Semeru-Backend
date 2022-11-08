const jwt = require('jsonwebtoken')
const Category = require('../model/Category')

const getCategory = async (req, res) => {
    try {
        const getCategory = await Category.findAll({})

        res.json(getCategory)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const addCategory = async (req, res) => {
    try {

        const category = req.body.category

        const addCategory = new Category({
            category
        })

        await addCategory.save()

        res.send(addCategory)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getCategory, addCategory
}