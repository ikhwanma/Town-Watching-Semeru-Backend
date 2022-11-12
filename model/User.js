const sequelize = require('sequelize')
const db = require('../utils/db')

const CategoryUser = require('./CategoryUser')

const User = db.define(
    "user",
    {
        name: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        image: { type: sequelize.STRING }
    },
    {
        freezeTableName: true
    }
)

CategoryUser.hasMany(User, { as: 'user' })
User.belongsTo(CategoryUser, {
    foreignKey: "categoryUserId",
    as: "category_user"
})

module.exports = User