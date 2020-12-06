const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const rateLimit = require("express-rate-limit")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter)

app.use(require('./features/words/WordRouter'))
app.use('/auth', require('./features/auth/AuthRouter'))
app.use(require('./utils/errorHandler'))
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(connected => {
        app.listen(PORT, _ => console.log(`Working on ${PORT}`))
    })