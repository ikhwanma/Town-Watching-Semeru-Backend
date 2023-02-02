const sequelize = require('sequelize')
const db = require('../utils/db')

const Category = db.define(
    "category",
    {
        category: { type: sequelize.STRING, allowNull: false },
        image: { type: sequelize.STRING, allowNull: false }
    },
    {
        freezeTableName: true
    }
)

module.exports = Category