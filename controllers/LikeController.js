const jwt = require('jsonwebtoken')
const Like = require('../model/Like')

const addLike = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id

        const postId = req.params.id

        const getLike = await Like.findOne({
            where: { userId: userId, postId: postId }
        })

        if (getLike) {
            await Like.destroy({
                where: { userId: userId, postId: postId }
            })

            res.status(200).send("Berhasil menghapus like")
        } else {
            const newLike = new Like({
                userId, postId
            })

            await newLike.save()

            res.status(200).send("Berhasil memberikan like")
        }


    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getPostLike = async (req, res) => {
    try {

        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode.id

        const getPost = await Like.findAll({
            where: { userId: userId },
            attributes: ['id', 'createdAt', 'updatedAt', 'userId'],
            include: ['post']
        })

        res.json(getPost)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = {
    addLike, getPostLike
}