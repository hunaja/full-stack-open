const errorHandler = (err, req, res, next) => {
    console.error(err)

    switch (err.name) {
    case 'SequelizeValidationError':
        res.status(400).json({ error: err.errors[0].message })
        break
    case 'SequelizeUniqueConstraintError':
        res.status(400).json({ error: err.errors[0].message })
        break
    case 'TokenExpiredError':
        res.status(400).json({ error: 'Token expired.' })
        break
    case 'JsonWebTokenError':
        res.status(400).json({ error: 'Token invalid.' })
        break
    default:
        res.status(500).json({ error: 'Unknown error.' })
        break
    }

    next()
}

module.exports = errorHandler
