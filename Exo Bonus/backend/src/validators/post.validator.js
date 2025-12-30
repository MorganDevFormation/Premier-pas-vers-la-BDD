const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'string.max': 'Le titre ne peut pas dépasser 200 caractères',
      'any.required': 'Le titre est requis'
    }),
  content: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.min': 'Le contenu doit contenir au moins 10 caractères',
      'any.required': 'Le contenu est requis'
    }),
  categoryId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'L\'ID de la catégorie doit être un nombre',
      'number.integer': 'L\'ID de la catégorie doit être un entier',
      'any.required': 'L\'ID de la catégorie est requis'
    })
});

module.exports = {
  postSchema
}; 