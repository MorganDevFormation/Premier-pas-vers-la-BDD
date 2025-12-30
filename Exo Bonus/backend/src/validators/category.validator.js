import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Le nom de la catégorie est requis.',
    'string.min': 'Le nom de la catégorie doit contenir au moins 3 caractères.',
    'string.max': 'Le nom de la catégorie ne peut pas dépasser 50 caractères.'
  }),
  description: Joi.string().max(255).allow(null, '').messages({
    'string.max': 'La description ne peut pas dépasser 255 caractères.'
  })
});