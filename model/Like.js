const sequelize = require('sequelize')
const db = require('../utils/db')

const User = require('./User')
const Post = require('./Post')

const Like = db.define(
    "like",
    {
    },
    {
        freezeTableName: true
    }
)

User.hasMany(Like, {
    foreignKey: {
        allowNull: false
    },
    as: 'like'
})
Like.belongsTo(User, {
    as: 'user'
}
)

Post.hasMany(Like, {
    foreignKey: {
        allowNull: false
    },
    as: 'like',
    onDelete: 'cascade',
})
Like.belongsTo(Post, {
    as: 'post'
})

module.exports = Like