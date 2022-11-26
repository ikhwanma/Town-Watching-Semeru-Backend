const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const upload = require('../middleware/upload')

const getUser = async (req, res) => {
    const token = req.headers.authorization
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    const user_id = decode.id

    const getUserData = await User.findOne({
        where: { id: user_id },
        attributes: [
            'id', 'name', 'email', 'password', 'image', 'createdAt', 'updatedAt'
        ],
        include: ['category_user']
    })

    res.json(getUserData)
}

const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
        if (err) {
            return res.send(err.message)
        }

        try {
            const { name, email, category_user } = req.body
            const password = hashedPass

            const checkUser = await User.findOne({
                where: { email: email }
            })

            if (checkUser) {
                return res.json({
                    message: "Email has already regstered"
                })
            }

            const iconPath = "images/user/mountain_icon.png"

            const newUser = new User({
                name, email, password, image: iconPath
            })

            res.json(newUser)

            await newUser.save().then(user => {
                res.json({
                    message: 'User Registered Successfully'
                })
            })
                .catch(error => {
                    res.json({
                        message: 'An error occured'
                    })
                })
        } catch (err) {
            res.status(500).send(err.message)
        }
    })
}


const maxAge = 30 * 24 * 60 * 60
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const getUser = await User.findOne({
            where: { email: email }
        }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        let token = jwt.sign({ id: user.id }, 'AzQ,PI)0(', { expiresIn: maxAge })
                        res.json({
                            message: 'Login Successful',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Password does not matched'
                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'No user found!'
                })
            }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const id = decode.id

        const { name, categoryUserId } = req.body

        const update = await User.update({
            name, categoryUserId
        }, { where: { id: id } })

        res.status(200).send("Profil berhasil diupdate")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const updatePassword = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const id = decode.id

        const { password, newPassword } = req.body

        const getUser = await User.findOne({
            where: { id: id }
        }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (result) {
                        bcrypt.hash(newPassword, 10, async (err, hashedPass) => {
                            const update = await User.update({
                                password: hashedPass
                            }, { where: { id: id } })

                            res.send("Password diubah")
                        })
                    } else {
                        res.send("Password Salah")
                    }

                })
            }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    login, register, getUser, updateUser, updatePassword
}