const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
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
            },
        })

        await queryInterface.createTable('users', {
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
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        })

        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    },
}
