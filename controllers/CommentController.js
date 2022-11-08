const jwt = require('jsonwebtoken')

const Comment = require('../model/Comment')

const addComment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = decode.id

        const { post_id, comment } = req.body

        const newComment = new Comment({
            user_id, post_id, comment
        })

        await newComment.save()

        res.json(newComment)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addComment
}