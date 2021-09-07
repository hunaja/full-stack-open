require('dotenv').config()

const jwt = require('jsonwebtoken')

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) 
    return res.status(401).json({ error: 'token missing or invalid' })

  req.user = decodedToken
  next()
}

module.exports = userExtractor
