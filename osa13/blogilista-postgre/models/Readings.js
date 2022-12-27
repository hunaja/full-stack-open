const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

class Readings extends Model {}

Readings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readings',
})

module.exports = Readings
