const mongoose = require('mongoose')

const Words = mongoose.model('words', {
    name: String,
    list: [],
    thumbnailImage: String,
    public: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Words