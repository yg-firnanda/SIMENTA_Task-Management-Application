const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(`${process.env.MYSQL_DATABASE_NAME}`, `${process.env.MYSQL_DATABASE_USERNAME}`, `${process.env.MYSQL_DATABASE_PASSWORD}`, {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize;