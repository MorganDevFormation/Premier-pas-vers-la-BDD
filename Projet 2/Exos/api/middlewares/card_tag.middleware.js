import Joi from "joi";

import HttpError from "../utils/HttpError.js";

// Validation du body d'une request
export const validateCardTagId = (req, res, next) => {

	// Schema JSON attendu
	const createTagIdSchema = Joi.object(
		{
			// obligatoire : une clé "id" avec comme valeur un entier positif
			id: Joi.number().positive().required()
		}
	);

	// Vérification des données dans le body
	const validation = createTagIdSchema.validate(req.body);

	// Erreur, les données sont invalides
	if (validation.error) {
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Appel le middleware suivant 
	next();
}



// Validation du body d'une request
export const validateCardTagList = (req, res, next) => {

	// Schema JSON attendu
	const updateTagListIdSchema = Joi.object(
		{
			// obligatoire : une clé "ids" avec comme valeur un tableau d'entiers positif
			ids: Joi.array().items(Joi.number().positive()).required()
		}
	);

	// Vérification des données dans le body
	const validation = updateTagListIdSchema.validate(req.body);

	// Erreur, les données sont invalides
	if (validation.error) {
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError(validation.error, 400);
	}

	// Appel le middleware suivant 
	next();
}


// Validation des id :idCard et idTag dans l'URL d'une requete
export const validateIdCardAndIdTag = (req, res, next) => {

	const idCard = Number(req.params.idCard);

	if (!Number.isInteger(idCard) && idCard <= 0) {
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError('Invalid idCard', 400));
		throw new HttpError('Invalid idCard', 400);
	}

	const idTag = Number(req.params.idTag);

	if (!Number.isInteger(idCard) && idCard <= 0) {
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError('Invalid idTag', 400));
		throw new HttpError('Invalid idTag', 400);
	}

	// Tout est OK, passe au middleware suivant
	next();
}