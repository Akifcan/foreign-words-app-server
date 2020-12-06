const router = require('express').Router()
const AuthController = require('./AuthController')
const authController = new AuthController()

const { currentUser } = require('./AuthMiddleware')

router.post('/register', authController.register)
router.post('/current-user', currentUser, authController.currentUser)
router.post('/login', authController.login)

module.exports = router