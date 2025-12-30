const Joi = require('joi');

const commentSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Le commentaire doit contenir au moins 1 caractère',
      'string.max': 'Le commentaire ne peut pas dépasser 1000 caractères',
      'any.required': 'Le contenu du commentaire est requis'
    }),
  postId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'L\'ID du post doit être un nombre',
      'number.integer': 'L\'ID du post doit être un entier',
      'any.required': 'L\'ID du post est requis'
    }),
  parentId: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': 'L\'ID du commentaire parent doit être un nombre',
      'number.integer': 'L\'ID du commentaire parent doit être un entier'
    })
});

module.exports = {
  commentSchema
}; 