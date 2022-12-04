const jwt = require('jsonwebtoken')
const Post = require('../model/Post')

const fs = require('fs')
const Like = require('../model/Like')
const Comment = require('../model/Comment')
const upload = require('../middleware/upload.post')


const addPost = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.send(err.message)
        }

        try {

            const token = req.headers.authorization
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            const userId = decode.id

            const { description, latitude, longitude, categoryId, level, status } = req.body
            const image = req.file.path

            const newPost = new Post({
                description, latitude, longitude, level, status, image, categoryId: categoryId, userId: userId
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
            order: [["id", "ASC"]],
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'level', 'status', 'image', 'createdAt', 'updatedAt'
            ],
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
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'level', 'status', 'image', 'createdAt', 'updatedAt'
            ],
            include: ['category', 'user', 'like', 'comment']
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
            order: [["id", "ASC"]],
            where: { categoryId: categoryId },
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'level', 'status', 'image', 'createdAt', 'updatedAt'
            ],
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
            order: [["id", "ASC"]],
            where: { id: id },
            attributes: [
                'id', 'description', 'latitude', 'longitude', 'level', 'status', 'image', 'createdAt', 'updatedAt'
            ],
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
        const id = req.params.id

        const post = await Post.findOne({
            where: { id: id }
        })

        await Post.destroy({
            where: { id: id, userId: userId }
        })

        await Like.destroy({
            where: { postId: id }
        })

        await Comment.destroy({
            where: { postId: id }
        })

        const imagePath = post.image.split("\\")

        fs.unlinkSync('images/' + imagePath[2])

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

        const { id, description, categoryId, level, status } = req.body

        const updateUser = await Post.update({
            description: description, categoryId: categoryId, level: level, status: status
        }, { where: { id: id, user_id: user_id } })

        // res.json(updateUser)
        await updateUser

        res.send("Data diupdate")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addPost, getAllPost, getDetailPost, deletePost, updatePost, getPostUser, getPostByCategory
}