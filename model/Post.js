const sequelize = require('sequelize')
const User = require('./User')
const Category = require('./Category')
const CategoryUser = require('./CategoryUser')
const db = require('../utils/db')

const Post = db.define(
    "post",
    {
        description: {
            type: sequelize.STRING,
            allowNull: false
        },
        latitude: {
            type: sequelize.DOUBLE, allowNull: false
        },
        longitude: { type: sequelize.DOUBLE, allowNull: false },
        level: { type: sequelize.STRING, allowNull: false },
        status: { type: sequelize.BOOLEAN, allowNull: false },
        image: { type: sequelize.STRING, allowNull: false },
    },
    {
        freezeTableName: true
    }
)

Category.hasMany(Post, {
    foreignKey: {
        allowNull: false
    }
}
)
Post.belongsTo(Category, {
    as: "category"
})

User.hasMany(Post, {
    as: 'post',
    foreignKey: {
        allowNull: false
    }
})
Post.belongsTo(User, {
    as: "user",
    include: ['category_user']
})

module.exports = Post

