const sequelize = require('sequelize')
const db = require('../utils/db')

const CategoryUser = db.define(
    "category_user",
    {
        category_user: { type: sequelize.STRING, allowNull: false }
    },
    {
        freezeTableName: true
    }
)

module.exports = CategoryUser