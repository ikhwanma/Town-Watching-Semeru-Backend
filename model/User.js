const sequelize = require('sequelize')
const db = require('../utils/db')

const CategoryUser = require('./CategoryUser')

const User = db.define(
    "user",
    {
        name: { type: sequelize.STRING, allowNull: false },
        email: { type: sequelize.STRING, allowNull: false },
        password: { type: sequelize.STRING, allowNull: false },
        image: { type: sequelize.STRING, allowNull: false },
        token: { type: sequelize.INTEGER },
        verified: { type: sequelize.BOOLEAN, allowNull: false }
    },
    {
        freezeTableName: true
    }
)

CategoryUser.hasMany(User, {
    foreignKey: {
        allowNull: false
    }
})
User.belongsTo(CategoryUser, {
    as: "category_user"
})

module.exports = User