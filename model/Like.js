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
    as: 'like'
})
Like.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
}
)

Post.hasMany(Like, {
    as: 'like'
})
Like.belongsTo(Post, {
    foreignKey: 'postId',
    as: 'post'
})

module.exports = Like