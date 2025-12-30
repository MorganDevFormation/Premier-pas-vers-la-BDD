import Joi from 'joi';

import HttpError from '../utils/HttpError.js';


export function validateCardCreate(req, res, next) {

	// Schema du JSON attendu
	const createCardSchema = Joi.object({
		content: Joi.string().required(),
		position: Joi.number().positive().required(),
		color: Joi.string(),
		list_id: Joi.number().positive().required(),
	});

	const validation = createCardSchema.validate(req.body)

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



export function validateCardUpdate(req, res, next) {

	const updateCardSchema = Joi.object({
		content: Joi.string(),
		position: Joi.number().positive(),
		color: Joi.string(),
		list_id: Joi.number().positive(),
	});

	const validation = updateCardSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();

}