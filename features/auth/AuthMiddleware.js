const jwt = require('jsonwebtoken')

const currentUser = (req, res, next) => {
    if (req.headers.authorization) {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)
        if (decoded) {
            req.user = decoded.id
            next()
        } else {
            next(new Error('Lütfen giriş yapın'))
        }
    } else {
        next(new Error('Lütfen giriş yapın'))
    }
}

module.exports = { currentUser }