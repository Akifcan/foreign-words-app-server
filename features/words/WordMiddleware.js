const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const setUserId = (req, res, next) => {
    if (req.headers.authorization) {
        const header = req.headers.authorization.split(' ')
        if (header[0] == 'user') {
            const decoded = jwt.verify(header[1], process.env.JWT_SECRET_KEY)
            req.userId = mongoose.Types.ObjectId(decoded.id)
        }
        if (header[0] == 'guest') {
            req.userId = header[1]
        }
        next()
    }
}

module.exports = { setUserId }