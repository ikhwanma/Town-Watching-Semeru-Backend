const sequelize = require('sequelize')

const db = new sequelize("semerutownwatch", "root", "", {
    dialect: "mysql",
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: '+07:00'
})

db.sync({})

module.exports = db