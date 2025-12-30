const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères',
      'any.required': 'Le nom d\'utilisateur est requis'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'L\'email doit être valide',
      'any.required': 'L\'email est requis'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
      'any.required': 'Le mot de passe est requis'
    }),
  bio: Joi.string()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'La bio ne peut pas dépasser 500 caractères'
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'L\'email doit être valide',
      'any.required': 'L\'email est requis'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Le mot de passe est requis'
    })
});

const updateProfileSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères'
    }),
  email: Joi.string()
    .email()
    .messages({
      'string.email': 'L\'email doit être valide'
    }),
  bio: Joi.string()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'La bio ne peut pas dépasser 500 caractères'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema
}; 