const jwt = require('jsonwebtoken')
const Like = require('../model/Like')

const addLike = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = decode.id

        const post_id = req.body.post_id

        const newLike = new Like({
            user_id, post_id
        })

        await newLike.save()

        res.status(200).send("Berhasil memberikan like")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addLike
}