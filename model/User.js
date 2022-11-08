const sequelize = require('sequelize')
const db = require('../utils/db')

const User = db.define(
    "user",
    {
        category_user_id: { type: sequelize.INTEGER },
        name: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        image: { type: sequelize.STRING }
    },
    {
        freezeTableName: true
    }
)

module.exports = User