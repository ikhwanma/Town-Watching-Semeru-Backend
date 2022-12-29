const sequelize = require('sequelize')
const db = require('../utils/db')

const Category = db.define(
    "category",
    {
        category: { type: sequelize.STRING },
        image: { type: sequelize.STRING }
    },
    {
        freezeTableName: true
    }
)

module.exports = Category