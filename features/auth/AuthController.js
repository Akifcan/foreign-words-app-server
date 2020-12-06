const validator = require('../../utils/validator')
const AuthModel = require('./AuthModel')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body
        const isValid = validator(
            [
                {
                    fieldName: 'E-posta',
                    field: email,
                    check: ['required|email'],
                    customMessage: ['Lütfen e-posta adresinizi belirtin', 'E-posta adresi en fazla 50 karakter olabilir']
                },
                {
                    fieldName: 'Şifre',
                    field: password,
                    check: ['required|min:5|max:100'],
                    customMessage: ['Lütfen şifrenizi belirtin', 'Şifre en az 5 karakter içermeli', 'Şifreniz en fazla 100 karakter olabilir']
                },
            ]
        )
        if (isValid == true) {
            const user = await AuthModel.findOne({ email, password: md5(password) })
            if (user) {
                res.status(200).json({ status: true, user, token: jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY) })
            } else {
                return next(new Error('Kullanıcı Adı veya şifrenizi hatalı girdiniz'))
            }
        } else {
            return next(new Error(isValid))
        }
    }
    async currentUser(req, res, next) {
        const user = await AuthModel.findOne({ _id: req.user })
        res.status(200).json({ status: true, user })
    }
    async register(req, res, next) {
        const { name, email, password } = req.body
        const isValid = validator(
            [
                {
                    fieldName: 'kullanıcı adı',
                    field: name,
                    check: ['required|max:50'],
                    customMessage: ['Lütfen kullanıcı adınızı belirtin', 'Kullanıcı adı en fazla 50 karakter olabilir']
                },
                {
                    fieldName: 'e-posta adresi',
                    field: email,
                    check: ['required|max:50|email'],
                    customMessage: ['Lütfen e-postanızı belirtin', 'E-posta adresi en fazla 50 karakter olabilir', 'E-posta formatını hatalı girdiniz']
                },
                {
                    fieldName: 'password',
                    field: password,
                    check: ['required|max:100|min:5'],
                    customMessage: ['Lütfen şifrenizi belirtin', 'Şifre en az 5 karakter içermeli', 'Şifreniz en fazla 100 karakter olabilir']
                }
            ]
        )
        if (isValid == true) {
            try {
                const newUser = await AuthModel.create(req.body)
                res.status(200).json({ status: true, user: newUser, message: 'Üyeliğiniz oluşturulmuştur', token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY) })
            } catch (error) {
                console.log(error);
                return next(new Error('Bu e-posta adresi ile hesap oluşturulmuş'))
            }
        } else {
            return next(new Error(isValid))
        }
    }
}

module.exports = AuthController