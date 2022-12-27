const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' },
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readings')
    },
}
