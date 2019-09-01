const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()        
    };

    return Joi.validate(data, schema);
}

const loginValidation = data => {
    const schema = {
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()        
    };

    return Joi.validate(data, schema);
}

const updateValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required()        
    };

    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;

