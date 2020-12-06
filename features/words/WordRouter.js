const router = require('express').Router()
const WordController = require('./WordController')
const wordController = new WordController()
const { setUserId } = require('./WordMiddleware')

router.post('/translate', wordController.translate)
router.post('/word-list', setUserId, wordController.wordList)
router.post('/create-word-list', setUserId, wordController.createWordList)
router.post('/share-public/:id', wordController.sharePublic)
router.post('/public-words', wordController.publicWords)
router.post('/single-post/:id', wordController.singleWord)

module.exports = router