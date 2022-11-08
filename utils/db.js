const sequelize = require('sequelize')

const db = new sequelize("semerutownwatch(test)", "root", "", {
    dialect: "mysql"
})

db.sync({})

module.exports = db