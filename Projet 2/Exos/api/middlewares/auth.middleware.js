import Joi from 'joi';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

import HttpError from '../utils/HttpError.js';

export function validateUser(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().min(10).max(30).required()
	})

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError("login ou mot de passe invalides", 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}

export function validateToken(req, res, next) {

	// 1. chercher le token qui est dans l'entête HTTP de la requete
	// entete sous forme de clé / valeur ==> Authorization: "Bearer < token >"
	// Valeur attendue : "Bearer <token>"
	const bearerToken = req.headers.authorization;

	// 2. Est-ce que bearerToken existe et commence par "Bearer "
	if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
		// Pas de authorization OU pas de bearer ==> lance une erreur 401 unauthorized qui sera attrapée par le errorHandler
		throw new HttpError("Authorization token missing or invalid", 401)
	}

	// 3. extraire le token de chaine de caractère
	const token = bearerToken.split(" ")[1];

		// 4. Utiliser JWT pour vérifier le token. Doc : https://www.npmjs.com/package/jsonwebtoken
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		
		// Token invalide => il a été modifié par le client ou il est expiré, etc.
		if (err) {
			console.log(err)
			throw new HttpError("Authorization token missing or invalid", 401)
		}

		// token valide !
		// decoded est un JSON ! Exemple : { user_id: 1, iat: 1765709324, exp: 1765712924 }
		// 5. Transmettre le user_id au controller pour qu'il puisse répondre à la requête 
		// La seule solution est d'ajouter user_id dans l'objet req (la requête HTTP)
		req.user_id = decoded.user_id;

	});

	// 5. passe au middleware suivante
	next();
}

// requiredRole ==> role minimum pur accéder à la route
// requiredRole prend comme valeur, soit "user", soit "admin"
export function isAllowed(requiredRole = '') {
	return async (req, res, next) => {

		try {

			// TODO Challenge 
			// Récupérer l'utilisateur connecté avec son role (voir la fonction getMe dans authController)
			// Vérifier si le role du l'utilisateur correspond au role de requiredRole
			// Si oui on laisse passer, sinon, rejeter la requête

		} catch (error) {
			next(error);
		}

	}
}