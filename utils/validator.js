const validator = (fields) => {

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const errors = []
    fields.forEach(input => {
        input.check.forEach(validatorValues => {
            const validatorArr = validatorValues.split('|')
            validatorArr.forEach((validator, index) => {
                if (validator == 'required') {
                    if (!input.field) {
                        errors.push(`${input.fieldName} is required`)
                    } else if (input.field.length == 0) {
                        if (input.customMessage) {
                            errors.push(`${input.customMessage[index]}`)
                        } else {
                            errors.push(`${input.fieldName} is required`)
                        }
                    }
                }
                if (validator == 'email') {
                    if (!emailRegex.test(input.field)) {
                        if (input.customMessage) {
                            errors.push(`${input.customMessage[index]}`)
                        } else {
                            errors.push(`${input.fieldName} should be an email`)
                        }
                    }
                }
                if (validator.includes('max')) {
                    const maxValue = validator.split(':')[1]
                    if (input.field) {
                        if (input.field.trim().length > maxValue) {
                            if (input.customMessage) {
                                errors.push(`${input.customMessage[index]}`)
                            } else {
                                errors.push(`${input.fieldName} character limit is ${maxValue}`)
                            }
                        }
                    }
                }
                if (validator.includes('min')) {
                    const minValue = validator.split(':')[1]
                    if (input.field) {
                        if (input.field.trim().length < minValue) {
                            if (input.customMessage) {
                                errors.push(`${input.customMessage[index]}`)
                            } else {
                                errors.push(`${input.fieldName} should be contain at least ${minValue} character`)
                            }
                        }
                    }
                }
            })
        })
    })

    return errors.length ? errors : true
}

module.exports = validator