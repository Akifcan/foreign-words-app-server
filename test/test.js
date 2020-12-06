const assert = require('chai').assert
const translate = require('../utils/translator')

describe('translator', _ => {
    it('should be return status true', (done) => {
        translate('intihar')
            .then(response => {
                assert.isTrue(response.status)
                done()
            })
    })
})