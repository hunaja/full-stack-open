const Sequelize = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const config = require('./config')

const sequelize = new Sequelize(config.databaseUrl)

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: { glob: 'migrations/*.js' },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
    })

    const migrations = await migrator.up()
    migrations.forEach((m) => console.log('Ran migration', m.name))

    console.log('Migrations are up to date.')
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('Database ready.')
    } catch (error) {
        console.log('An error occured while connecting to PGSQL', error)
        process.exit(1)
    }
}

module.exports = { connectToDatabase, sequelize }
