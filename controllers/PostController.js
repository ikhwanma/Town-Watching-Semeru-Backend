const jwt = require('jsonwebtoken')
const Post = require('../model/Post')

const fs = require('fs')
const upload = require('../middleware/upload.post')
const { Sequelize } = require('sequelize')
const User = require('../model/User')


const addPost = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.send(err.message)
        }
        try {
            const token = req.headers.authorization
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            const userId = decode.id

            const { description, latitude, longitude, address, categoryId, level, status, detailCategory } = req.body
            const image = req.file.path

            const newPost = new Post({
                description, latitude, longitude, address, level, status, detailCategory, image, categoryId: categoryId, userId: userId, isDeleted: false
            })

            await newPost.save()

            res.json(newPost)
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
}

const getAllPost = async (req, res) => {
    try {
        const where = {}

        const { categoryId, level, status } = req.query
        if (categoryId) where.categoryId = { [Sequelize.Op.eq]: categoryId }
        if (level) where.level = { [Sequelize.Op.eq]: level }
        if (status) where.status = { [Sequelize.Op.eq]: status }

        where.isDeleted = { [Sequelize.Op.eq]: false }

        const getAllPost = await Post.findAll({
            order: [["updatedAt", "ASC"]],
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'address', 'level', 'status', 'detailCategory', 'image', 'createdAt', 'updatedAt'
            ],
            include: ['category', 'like', 'comment', {
                model: User, as: 'user', include: ['category_user']
            }],
            where: {
                ...where
            }
        })

        res.json(getAllPost)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getPostUser = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id

        const getPost = await Post.findAll({
            order: [["updatedAt", "ASC"]],
            where: { userId: userId, isDeleted: false },
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'address', 'level', 'status', 'detailCategory', 'image', 'createdAt', 'updatedAt'
            ],
            include: ['category', 'like', 'comment', {
                model: User, as: 'user', include: ['category_user']
            }]
        })

        res.json(getPost)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getPostByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        const getPost = await Post.findAll({
            order: [["updatedAt", "ASC"]],
            where: { categoryId: categoryId, isDeleted: false },
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'address', 'level', 'status', 'detailCategory', 'image', 'createdAt', 'updatedAt'
            ],
            include: ['category', 'like', 'comment', {
                model: User, as: 'user', include: ['category_user']
            }]
        })

        res.json(getPost)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getDetailPost = async (req, res) => {
    try {
        const id = req.params.id

        const getPost = await Post.findOne({
            order: [["updatedAt", "ASC"]],
            where: { id: id, isDeleted: false },
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'address', 'level', 'status', 'detailCategory', 'image', 'createdAt', 'updatedAt'
            ],
            include: ['category', 'like', 'comment', {
                model: User, as: 'user', include: ['category_user']
            }],
        })

        res.json(getPost)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id
        const id = req.params.id

        await Post.update({
            isDeleted: true
        }, { where: { id: id, userId: userId } })

        res.json({ message: "Laporan berhasil dihapus" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = decode.id

        const { id, description, categoryId, level, status, detailCategory } = req.body

        const updateUser = await Post.update({
            description: description, categoryId: categoryId, level: level, status: status, detailCategory: detailCategory
        }, { where: { id: id, userId: user_id } })

        await updateUser

        res.json({ message: "Laporan diperbarui" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addPost, getAllPost, getDetailPost, deletePost, updatePost, getPostUser, getPostByCategory
}