//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        sex: Joi.number()
            .required(),
        activityLevel: Joi.number()
            .required(),
        birthDate: Joi.date()
            .required(),
        height: Joi.number()
            .required(),
        actualBodyWeight: Joi.number()
            .required(),
        targetBodyWeight: Joi.number()
            .required(),
        target: Joi.number()
            .required(),
        weeklyGoal: Joi.number()
            .required(),
    };
    return Joi.validate(data, schema);
};
const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;