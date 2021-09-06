require('dotenv').config({ debug: true })

const PORT = process.env.PORT || 8080

const MONGODB_URL = (process.env.NODE_ENV !== 'test') 
    ? process.env.MONGODB_URI
    : process.env.MONGODB_TEST_URI

module.exports = {
    MONGODB_URL,
    PORT
}
