const jwt = require('jsonwebtoken')

const Comment = require('../model/Comment')
const User = require('../model/User')

const addComment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id

        const { postId, comment } = req.body

        const newComment = new Comment({
            userId, postId, comment
        })

        await newComment.save()

        res.json({ message: "Komentar ditambahkan" })

    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getComment = async (req, res) => {
    try {
        const postId = req.params.id

        const getCommentPost = await Comment.findAll({
            order: [["id", "ASC"]],
            where: { postId: postId },
            attributes: ['id', 'comment', 'createdAt', 'updatedAt', 'postId'],
            include: [{ model: User, as: 'user', include: ['category_user'] }]
        })
        res.json(getCommentPost)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id
        const id = req.params.id

        await Comment.destroy({
            where: { id: id, userId: userId }
        })

        res.json({ message: "Komentar dihapus" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addComment, getComment, deleteComment
}