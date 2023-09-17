const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Session = sequelize.afterDefine('session', {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
})

module.exports = Session;