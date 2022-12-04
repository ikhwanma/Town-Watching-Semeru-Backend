const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')
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
        const getAllCategoryUser = await CategoryUser.findAll({
            order: [["id", "ASC"]],
        })

        res.json(getAllCategoryUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getCategoryUser = async (req, res) => {
    try {
        const where = {}

        const { id, category_user } = req.query
        if (id) where.id = { [Sequelize.Op.eq]: id }
        if (category_user) where.category_user = { [Sequelize.Op.like]: category_user }

        const getCategoryUser = await CategoryUser.findAll({
            where: {
                ...where
            }
        })

        res.json(getCategoryUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addCategoryUser, getAllCategoryUser, getCategoryUser
}