const sequelize = require('sequelize')
const db = require('../utils/db')

const CategoryUser = require('./CategoryUser')

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

CategoryUser.hasMany(User, { as: 'user' })
User.belongsTo(CategoryUser, {
    foreignKey: "category_user_id",
    as: "category_user",
})

module.exports = User