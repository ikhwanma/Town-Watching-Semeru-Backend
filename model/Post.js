const sequelize = require('sequelize')
const User = require('./User')
const Category = require('./Category')
const CategoryUser = require('./CategoryUser')
const db = require('../utils/db')

const Post = db.define(
    "post",
    {
        description: { type: sequelize.STRING },
        latitude: { type: sequelize.STRING },
        longitude: { type: sequelize.STRING },
        level: { type: sequelize.INTEGER },
        image: { type: sequelize.STRING },
    },
    {
        freezeTableName: true
    }
)

Category.hasMany(Post, { as: 'post' })
Post.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
})

User.hasMany(Post, { as: 'post' })
Post.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    include: ['category_user']
})

module.exports = Post

