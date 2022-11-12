const jwt = require('jsonwebtoken')

const Comment = require('../model/Comment')

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

        res.json(newComment)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getComment = async (req, res) => {
    try {
        const postId = req.params.id

        const getComment = await Comment.findAll({
            where: { postId: postId }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }

    res.json(getComment)
}

module.exports = {
    addComment, getComment
}