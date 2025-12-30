import Joi from "joi";

import HttpError from "../utils/HttpError.js";

// Middleware pour valider le body d'une request POST
export const validateTagCreate = (req, res, next) => {

	// Description d'un objet de validation
	// On ajoute toutes les clés qu'on attends et les types de valeurs attendus
	const createTagSchema = Joi.object(
		{
			name: Joi.string().required(),
			color: Joi.string()
		}
	);

	// Vérification des données dans le body
	const validation = createTagSchema.validate(req.body);

	// Erreur, les données sont invalides
	if (validation.error) {
		// 400: Bad Request
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Appel le middleware suivant 
	next();
}

// Middleware pour valider le body d'une request PATCH
export const validateTagUpdate = (req, res, next) => {

	// Description d'un objet de validation
	// On ajoute toutes les clés qu'on attends et les types de valeurs attendus
	const createTagSchema = Joi.object({
		// On fait de l'update, contrairement au create, les clés ne sont pas obligatoires
		name: Joi.string(),
		color: Joi.string()
	});

	// Vérification des données dans le body
	const validation = createTagSchema.validate(req.body);

	// Erreur, les données sont invalides
	if (validation.error) {
		// 400: Bad Request
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Appel le middleware suivant 
	next();
}