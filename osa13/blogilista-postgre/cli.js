require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

const main = async () => {
    try {
        await sequelize.authenticate()

        const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })

        blogs.forEach((blog) => {
            console.log(`${blog.author || 'Anonymous'}: '${blog.title}', ${blog.likes} likes`)
        })
    } catch (error) {
        console.error('An error occured', error)
    } finally {
        sequelize.close()
    }
}

main()
