const sequelize = require('sequelize')
const db = require('../utils/db')

const User = require('./User')
const Post = require('./Post')

const Comment = db.define(
    "comment",
    {
        comment: { type: sequelize.STRING, allowNull: false }
    },
    {
        freezeTableName: true
    }
)

User.hasMany(Comment, {
    foreignKey: {
        allowNull: false
    },
    as: 'comment'
})
Comment.belongsTo(User, {
    as: 'user'
})

Post.hasMany(Comment, {
    as: 'comment',
    onDelete: 'cascade',
    foreignKey: {
        allowNull: false
    }
})
Comment.belongsTo(Post, {
    onDelete: 'cascade',
    as: 'post'
})

module.exports = Comment