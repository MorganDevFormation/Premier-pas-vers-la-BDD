import Joi from 'joi';

import httpError from '../utils/httpError.js';


// Validation du body d'une request


export const validateCardTagId = (req, res, next) => {

    const createTagIdSchema = Joi.object(
		{
			
			id: Joi.number().positive().required()      // obligatoire : une clé "id" avec comme valeur un entier positif
		}
	);

	
	const validation = createTagIdSchema.validate(req.body);        // Vérification des données dans le body

	// Erreur, les données sont invalides

	if (validation.error) {
		
		throw new httpError(validation.error, 400);         // Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		                                                    // Equivalent de : return next(new HttpError(validation.error, 400));
	}

	next();     // Appel le middleware suivant 
}

// Validation du body d'une request

export const validateCardTagList = (req, res, next) => {

	
	const updateTagListIdSchema = Joi.object(           // Schema JSON attendu
		{
			
			ids: Joi.array().items(Joi.number().positive()).required()        // obligatoire : une clé "ids" avec comme valeur un tableau d'entiers positif
		}
	);

	
	const validation = updateTagListIdSchema.validate(req.body);        // Vérification des données dans le body

	// Erreur, les données sont invalides


	if (validation.error) {
		
		throw new httpError(validation.error, 400);         // Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		                                                    // Equivalent de : return next(new HttpError(validation.error, 400));
	}

	next();     // Appel le middleware suivant 

}

// Validation des id :idCard et idTag dans l'URL d'une requete

export const validateIdCardAndIdTag = (req, res, next) => {

	const idCard = Number(req.params.idCard);

	if (!Number.isInteger(idCard) && idCard <= 0) {
		
		throw new httpError('Invalid idCard', 400);     // Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		                                                // Equivalent de : return next(new HttpError('Invalid idCard', 400));
	}

	const idTag = Number(req.params.idTag);

	if (!Number.isInteger(idCard) && idCard <= 0) {
		
		throw new httpError('Invalid idTag', 400);      // Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		                                                // Equivalent de : return next(new HttpError('Invalid idTag', 400));
	}

	next();         // Tout est OK, passe au middleware suivant

}
