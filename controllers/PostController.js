const jwt = require('jsonwebtoken')
const Post = require('../model/Post')

const multer = require('multer')
const fs = require('fs')
const Category = require('../model/Category')

const UserController = require('./UserController')


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/post')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

var upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')

const addPost = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.send(err.message)
        }

        try {

            const token = req.headers.authorization
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            const userId = decode.id

            const { description, latitude, longitude, categoryId, level } = req.body
            const image = req.file.path

            const newPost = new Post({
                description, latitude, longitude, level, image, categoryId: categoryId, userId: userId
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
        const getAllPost = await Post.findAll({
            include: ['category', 'user', 'like', 'comment']
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
            where: { userId: userId },
            include: ['category', 'user', 'like', 'comment']
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
            where: { id: id },
            include: ['category', 'user', 'like', 'comment']
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
        const id = req.body.id

        const post = await Post.findOne({
            where: { id: id }
        })

        const deletePost = await Post.destroy({
            where: { id: id, user_id: userId }
        })

        await deletePost

        const imagePath = post.image.split("\\")

        fs.unlinkSync('images/post/' + imagePath[2])

        res.send("Data berhasil dihapus")

    } catch (err) {
        res.status(500).send(err.message)
    }
}

const updatePost = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = decode.id

        const { id, description, category, level } = req.body

        const updateUser = await Post.update({
            description: description, category: category, level
        }, { where: { id: id, user_id: user_id } })

        // res.json(updateUser)
        await updateUser

        res.send("Data diupdate")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addPost, getAllPost, getDetailPost, deletePost, updatePost, getPostUser
}