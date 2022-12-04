const jwt = require('jsonwebtoken')
const Category = require('../model/Category')

const getCategory = async (req, res) => {
    try {
        const getCategory = await Category.findAll({
            order: [["id", "ASC"]]
        })

        res.json(getCategory)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getCategoryById = async (req, res) => {
    try {

        const id = req.params.id

        const category = await Category.findOne({
            where: { id: id }
        })

        res.json(category)
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
    getCategory, addCategory, getCategoryById
}