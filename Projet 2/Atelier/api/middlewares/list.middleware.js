import Joi from 'joi';

import HttpError from '../utils/HttpError.js';

export function validateListCreate(req, res, next) {

	// Schema du JSON attendu
	const createListSchema = Joi.object({
		title: Joi.string().required(),
		position: Joi.number().positive().required()
	})

	const validation = createListSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// const position = req.body.position;
	// if (position < 0) {
	// 	// Position < 0, invalide
	// 	res.status(400).json({ error: 'Position inferieur a zero' });

	// 	// FIN du traitement de la requete HTTP
	// 	return;
	// } 

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}

export function validateListUpdate(req, res, next) {

	const updateListSchema = Joi.object({
		title: Joi.string(),
		position: Joi.number().positive()
	})

	const validation = updateListSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}