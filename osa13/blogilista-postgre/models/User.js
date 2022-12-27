const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    },
}, {
    sequelize,
    underscored: true,
    modelName: 'user',
})

module.exports = User
