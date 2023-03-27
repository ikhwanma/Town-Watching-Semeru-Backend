const sequelize = require('sequelize')
const User = require('./User')
const Category = require('./Category')
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
        address: { type: sequelize.STRING, allowNull: false },
        level: { type: sequelize.STRING, allowNull: false },
        status: { type: sequelize.BOOLEAN, allowNull: false },
        detailCategory: { type: sequelize.STRING, allowNull: true },
        image: { type: sequelize.STRING, allowNull: false },
        isDeleted: { type: sequelize.BOOLEAN, allowNull: false }
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

