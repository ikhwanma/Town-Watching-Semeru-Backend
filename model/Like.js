const sequelize = require('sequelize')
const db = require('../utils/db')

const Like = db.define(
    "like",
    {
        user_id: { type: sequelize.INTEGER },
        post_id: { type: sequelize.INTEGER },
    },
    {
        freezeTableName: true
    }
)

module.exports = Like