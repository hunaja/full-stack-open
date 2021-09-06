const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  req.token = (authorization && authorization.toLowerCase().startsWith('bearer '))
    ? authorization.substring(7)
    : null

  next()
}

module.exports = tokenExtractor
