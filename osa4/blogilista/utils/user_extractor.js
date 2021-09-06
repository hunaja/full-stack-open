const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) 
    return res.status(401).json({ error: 'token missing or invalid' })

  req.user = request.token
  next()
}

module.exports = userExtractor
