const sequelize = require('sequelize')

const db = new sequelize("semerutownwatch", "root", "", {
    dialect: "mysql"
})

db.sync({})

module.exports = db