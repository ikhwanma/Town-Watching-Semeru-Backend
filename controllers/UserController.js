const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const nodemailer = require('nodemailer')
const upload = require('../middleware/upload.user')
var randtoken = require('rand-token').generator({
    chars: '0-9'
})
let transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP
    }
});

const getUser = async (req, res) => {
    const token = req.headers.authorization
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    const user_id = decode.id

    const getUserData = await User.findOne({
        where: { id: user_id },
        attributes: [
            'id', 'name', 'email', 'password', 'image', 'verified', 'createdAt', 'updatedAt'
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
            const token = randtoken.generate(4)
            const { name, email, categoryUserId } = req.body
            const password = hashedPass

            const checkUser = await User.findOne({
                where: { email: email }
            })

            if (checkUser) {
                return res.status(409).json({
                    message: "Email has already regstered"
                })
            }

            const iconPath = "images/user/mountain_icon.png"

            const newUser = new User({
                name: name,
                email: email,
                password: password,
                categoryUserId: categoryUserId,
                image: iconPath,
                token: token,
                verified: false
            })

            var htmlText = '<h1>Halo, <strong>' + newUser.name + '</strong></h1><h2>Masukkan Kode ini untuk verifikasi akun anda<br/></h2><h1>' + token
            transport.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Kode Verifikasi',
                html: htmlText,
            })
            await newUser.save().then(user => {
                res.json({
                    message: 'User Registered Successfully'
                })
            })
                .catch(error => {
                    res.status(501).json({
                        message: error.message
                    })
                })
        } catch (err) {
            res.status(500).json({ message: message })
        }
    })
}

const verifyCode = async (req, res) => {
    try {
        const { email, token } = req.body

        await User.findOne({
            where: { email: email }
        }).then(user => {
            if (token == user.token) {
                user.update({
                    token: null,
                    verified: true
                })
                res.status(200).json({ message: "Sukses mendaftarkan akun" })
            } else {
                res.status(400).json({ message: "Token Salah" })
            }
        })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const resendCode = async (req, res) => {
    try {
        const { email } = req.body
        const token = randtoken.generate(4)

        await User.findOne({
            where: { email: email }
        }).then(user => {
            if (!user) {
                res.status(401).json({ message: "Pengguna tidak ditemukan" })
                return
            } else {
                var htmlText = '<h1>Halo, <strong>' + user.name + '</strong></h1><h2>Masukkan Kode ini untuk verifikasi akun anda<br/></h2><h1>' + token
                transport.sendMail({
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Kode Verifikasi',
                    html: htmlText,
                })

                user.update({
                    token: token,
                })

                res.status(200).json({ message: "Email terkirim, cek email anda" })
            }
        })




    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const maxAge = 30 * 24 * 60 * 60

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        await User.findOne({
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
                        if (user.verified) {
                            let token = jwt.sign({ id: user.id }, 'AzQ,PI)0(', { expiresIn: maxAge })
                            res.json({
                                message: 'Login successful',
                                token,
                                id: user.id
                            })
                        } else {
                            res.json({
                                message: 'Verifikasi user terlebih dahulu',
                                token: "",
                                id: 0
                            })
                        }
                    } else {
                        res.json({
                            message: 'Password salah',
                            token: "",
                            id: 0
                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'Email belum terdaftar',
                    token: "",
                    id: 0
                })
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const id = decode.id

        const { name, categoryUserId } = req.body

        await User.update({
            name, categoryUserId
        }, { where: { id: id } })

        res.status(200).json({ message: "Profil berhasil diubah" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updatePassword = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const id = decode.id

        const { password, newPassword } = req.body

        await User.findOne({
            where: { id: id }
        }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (result) {
                        bcrypt.hash(newPassword, 10, async (err, hashedPass) => {
                            user.update({
                                password: hashedPass
                            }, { where: { id: id } })

                            res.json({ message: "Password diubah" })
                        })
                    } else {
                        res.json({ message: "Password salah" })
                    }

                })
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        await User.findOne({
            where: { email: email }
        }).then(user => {
            bcrypt.hash(newPassword, 10, async (err, hashedPass) => {
                await user.update({
                    password: hashedPass
                })

                res.json({ message: "Password diubah" })
            })
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateAva = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const token = req.headers.authorization
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            const id = decode.id
            const image = req.file.path
            const iconPath = "images/user/mountain_icon.png"

            const getUser = await User.findOne({
                where: { id: id }
            }).then(user => {
                if (user.image !== iconPath) {
                    const imagePath = user.image.split("/")

                    fs.unlinkSync('images/user/' + imagePath[2])
                }
            })

            await User.update({
                image: image
            }, { where: { id: id } })

            res.json({ message: "Foto profil diubah" })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
}

module.exports = {
    login, register, getUser, updateUser, updatePassword, updateAva, verifyCode, resendCode, resetPassword
}