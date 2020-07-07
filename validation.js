// Validation
const Joi = require('@hapi/joi')

const registrationValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registrationValidation;
module.exports.loginValidation = loginValidation;