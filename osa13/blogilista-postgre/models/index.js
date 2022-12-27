const Blog = require('./Blog')
const User = require('./User')
const Readings = require('./Readings')
const Session = require('./Session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readings, as: 'reading' })
Blog.belongsToMany(User, { through: Readings, as: 'usersReading' })

module.exports = {
    Blog,
    User,
    Readings,
    Session,
}
