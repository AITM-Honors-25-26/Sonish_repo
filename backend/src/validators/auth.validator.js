const Joi = require('joi');

// Reusable password rule: at least 8 chars, one letter, one number
const passwordRule = Joi.string()
  .min(8)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain at least one letter and one number',
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password is required',
  });

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
  }),
  password: passwordRule,
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
