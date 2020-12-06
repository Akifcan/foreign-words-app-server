const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function translate(word) {
    const response = await fetch(`https://tureng.com/tr/turkce-ingilizce/${word}`)
    const html = await response.text()

    const $ = cheerio.load(html)
    const means = []
    const otherTerm = []
    if ($('.searchResultsTable').html() != null) {
        $('.searchResultsTable').find('.en').each((index, element) => {
            const el = $(element).find('a').text().trim()
            if (el != '' && el.length > 0) {
                means.push(el)
            }
        })

        $('#englishResultsTable').find('.en').each((index, element) => {
            const el = $(element).find('a').text().trim()
            if (el != '' && el.length > 0) {
                otherTerm.push(el)
            }
        })

        return {
            status: true,
            means: means.slice(0, 3),
            otherTerm: otherTerm.length > 5 ? otherTerm.slice(5, 10) : otherTerm
        }


    } else {
        return {
            status: false,
            message: 'Böyle bir kelime bulamadım. 😿'
        }
    }


}


module.exports = translate