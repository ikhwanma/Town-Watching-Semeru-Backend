const jwt = require('jsonwebtoken')
const CategoryUser = require('../model/CategoryUser')

const addCategoryUser = async (req, res) => {
    try {
        const categoryUser = req.body.category_user

        const newCategoryUser = new CategoryUser({
            categoryUser
        })

        await categoryUser.save()

        res.status(200).json(newCategoryUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getAllCategoryUser = async (req, res) => {
    try {
        const getAllCategoryUser = await CategoryUser.findAll({})

        res.json(getAllCategoryUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getCategoryUserById = async (req, res) => {
    try {
        const id = req.params.id

        const getCategoryUser = await CategoryUser.findOne({
            where: { id: id }
        })

        res.json(getCategoryUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addCategoryUser, getAllCategoryUser, getCategoryUserById
}