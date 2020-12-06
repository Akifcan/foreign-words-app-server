const mongoose = require('mongoose')
const md5 = require('md5')
const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 100,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

AuthSchema.pre('save', function (next) {
    this.password = md5(this.password)
    next()
})
module.exports = mongoose.model('auths', AuthSchema)