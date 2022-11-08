const sequelize = require('sequelize')
const db = require('../utils/db')

const Comment = db.define(
    "comment",
    {
        user_id: { type: sequelize.INTEGER },
        post_id: { type: sequelize.INTEGER },
        comment: { type: sequelize.STRING }
    },
    {
        freezeTableName: true
    }
)

module.exports = Comment