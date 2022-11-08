const sequelize = require('sequelize')
const User = require("./User")
const db = require('../utils/db')

const Post = db.define(
    "post",
    {
        description: { type: sequelize.STRING },
        latitude: { type: sequelize.STRING },
        longitude: { type: sequelize.STRING },
        category_id: { type: sequelize.INTEGER },
        level: { type: sequelize.INTEGER },
        user_id: { type: sequelize.INTEGER },
        image: { type: sequelize.STRING },
    },
    {
        freezeTableName: true
    }
)

module.exports = Post

