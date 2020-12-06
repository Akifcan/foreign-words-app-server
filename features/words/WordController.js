const WordModel = require('./WordModel')
const fetch = require('node-fetch')
const translate = require('../../utils/translator')

class WordController {
    async translate(req, res) {
        const result = await translate(req.body.word)
        res.status(200).json({
            result
        })
    }
    async wordList(req, res) {
        try {
            console.log(req.userId);
            const words = await WordModel.find({ userId: req.userId })
            res.status(200).json({ status: true, words })
        } catch (error) {
            return next(new Error('Beklenmedik bir oluştu lütfen tekrar dener misiniz?'))
        }
    }
    async createWordList(req, res, next) {
        try {
            const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${req.body.questions.name}&client_id=${process.env.UNSPLASH_CLIENT_ID}`)
            const imageData = await imageResponse.json()

            let thumbnailImage = ''
            if (imageData.total > 1) {
                thumbnailImage = imageData.results[0].urls.regular
            } else {
                thumbnailImage = `images/default-image-${Math.floor(Math.random() * 8) + 1}.jpg`
            }

            await WordModel.create({ ...req.body.questions, thumbnailImage, userId: req.userId })
            return res.status(200).json({ status: true, message: 'Kelime listesi oluşturulmuştur 😊😁' })
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu😿 lütfen tekrar dener misiniz?'))
        }
    }

    async sharePublic(req, res) {
        try {
            const { id: _id } = req.params
            await WordModel.updateOne({ _id }, { public: true })
            res.status(200).json({ status: true, message: 'Oluşturduğunuz kelime listesi herkese açık paylaşılmıştır' })
        } catch (error) {
            return next(new Error('Beklenmedik bir hata oluştu😿 lütfen tekrar dener misiniz?'))
        }
    }

    async publicWords(req, res, next) {
        try {
            const words = await WordModel.aggregate([
                {
                    $match: { public: true }
                },
                {
                    $lookup: {
                        from: 'auths',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                }
            ])
            res.status(200).json({ status: true, words })
        } catch (error) {
            return next(new Error('Beklenmedik bir hata oluştu😿 lütfen tekrar dener misiniz?'))
        }
    }

    async singleWord(req, res, next) {
        try {
            const { id: _id } = req.params
            const word = await WordModel.findOne({ _id })
            if (word) {
                res.status(200).json({ status: true, word })
            } else {
                return next(new Error('Böyle bir sayfa bulamadım'))
            }
        } catch (error) {
            console.log(error)
            return next(new Error('Beklenmedik bir hata oluştu😿 lütfen tekrar dener misiniz?'))
        }
    }
}

module.exports = WordController