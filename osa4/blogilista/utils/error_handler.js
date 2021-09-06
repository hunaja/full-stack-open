const handleError = (error, req, res, next) => {
  console.log(error.message)

  switch (error.name) {
  case 'CastError':
    return res.status(400).json({ error: 'malformatted id' })
  case 'ValidationError':
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = handleError
