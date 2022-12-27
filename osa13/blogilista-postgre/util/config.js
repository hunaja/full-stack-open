require('dotenv').config()

module.exports = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 8080,
    jwtToken: process.env.JWT_TOKEN,
    passwordHashRounds: 10,
}
