import Joi from "joi";

export const userSignUpSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required().min(3),
    password: Joi.string().required().min(3)
})
export const userSignInSchema = Joi.object({
    email: Joi.string().email().required().min(3),
    password: Joi.string().required().min(3),
})