const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    mata_kuliah: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('selesai', 'belum'),
        allowNull: false
    }
})

module.exports = Task