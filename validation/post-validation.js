const Joi = require('@hapi/joi');

const postValidation = data => {
    const schema = {
        title: Joi.string().required(),
        content: Joi.string().required(),
        metaTitle: Joi.string().required(),
        metaDescription: Joi.string().required()     
    };

    return Joi.validate(data, schema);
}

module.exports.postValidation = postValidation;

