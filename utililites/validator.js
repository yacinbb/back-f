const Joi = require("joi")

const artValidator = Joi.object({
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    photo: Joi.string(),
    price: Joi.number().required()
});

const registerValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  role: Joi.string().required().max(1)
})

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
})
module.exports = {artValidator , registerValidator , loginValidator}