const sequelize = require('sequelize')
const db = require('../utils/db')

const User = require('./User')
const Post = require('./Post')

const Comment = db.define(
    "comment",
    {
        post_id: { type: sequelize.INTEGER },
        comment: { type: sequelize.STRING }
    },
    {
        freezeTableName: true
    }
)

User.hasMany(Comment, {
    as: 'comment'
})
Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

Post.hasMany(Comment, {
    as: 'comment'
})
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    as: 'post'
})

module.exports = Comment