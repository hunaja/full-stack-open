const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true,
        },
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            inRange() {
                const thisYear = new Date().getFullYear()
                const year = Number.parseInt(this.year, 10)

                if (Number.isNaN(year)) return;

                if (year < 1991 || year > thisYear) {
                    throw new Error(`year must be between 1991-${thisYear}`)
                }
            },
        },
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
})

module.exports = Blog
