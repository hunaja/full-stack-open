const handleError = (error, req, res, next) => {
  console.log(error.message)

  switch (error.name) {
  case 'CastError':
    return res.status(400).json({ error: 'malformatted id' })
  case 'ValidationError':
    return res.status(400).json({ error: error.message })
  case 'JsonWebTokenError':
    return res.status(401).json({ error: 'invalid token' })
  default:
    break;
  }

  next(error)
}

module.exports = handleError
