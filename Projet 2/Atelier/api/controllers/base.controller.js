import HttpError from '../utils/HttpError.js';

class BaseController {

	// Model à utiliser pour interroger la BDD
	#model;
	#modelName;

	constructor(model, modelName) {
		this.#model = model;
		this.#modelName = modelName;
	}


	// ==========================
	// Méthode getRequestOptions(req)
	// ==========================
	// Une méthode à "remplir" dans les classes filles pour paramétrer les informations à renvoyer lors des GET
	// -----------
	getRequestOptions(req) {

		// TODO : implémenter cette fonction dans les classes enfants

		return []
	}

	
	getAll = async (req, res, next) => {

		try {

			// tableau des options à ajouter dans le findAll
			const options = this.getRequestOptions(req);

			// SELECT
			// Avec l'option include pour récupérer les autres modèles si besoin
			// Voir options.include : https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAll
			const results = await this.#model.findAll({ include: options });

			// Renvois la réponse code 200 avec tous les résultats de la requete SQL au format JSON
			res.status(200).json(results);

		} catch (error) {
			next(error);
		}
	}


	// 1. Renvoyer un seul model
	// id du model demandé se trouve dans l'URL
	getById = async (req, res, next) => {

		try {

			// 1. Récupérer l'ID qui est dans l'URL
			const id = req.params.id;

			// tableau des options à ajouter dans le findAll
			const options = this.getRequestOptions(req);

			// 2. Utiliser le modèle Sequelize pour interroger la BDD
			// SELECT
			// Avec l'option include pour récupérer les autres modèles si besoin
			// Voir options.include : https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAll
			const result = await this.#model.findByPk(id, { include: options });

			// Vérifier est-ce que result est null ?
			// si oui, ça signifie que le result demandé n'existe pas
			if (!result) {

				// Le result est null
				// Error est une classe de Javascript pour gérer les erreur
				// Le constructeur de la classe Error permet de passer en argument un message d'erreur
				const errorNotFound = new HttpError(`${this.#modelName} Not Found`, 404);
				// J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
				// toutes les instruction après le throw ne seront pas exécutées
				throw errorNotFound;
			}

			// 3. Répondre à la requete HTTP du client
			res.status(200).json(result);

		} catch (error) { // error est une instance de la classe Error de JS
			// Le fait d'ajouter un argument à next(error) : une erreur, ça appelle le middleware qui gère les erreurs, 
			// pour nous, c'est errorHandler dans le common.middleware
			next(error);
		}
	}


	// 2. Delete by ID
	// id du model demandé se trouve dans l'URL
	delete = async (req, res, next) => {

		try {

			// 1. Récupérer l'ID qui est dans l'URL
			const id = req.params.id;

			// 2. Utiliser le modèle Sequelize pour interroger la BDD
			// Doc : https://sequelize.org/api/v6/class/src/model.js~model#static-method-destroy
			const nbElementDestroyed = await this.#model.destroy(
				// WHERE id = id
				{ where: { id: id } }
			);

			// Aucune élément n'a été supprimées
			if (0 === nbElementDestroyed) {

				// Error est une classe de Javascript pour gérer les erreur
				// Le constructeur de la classe Error permet de passer en argument un message d'erreur
				const errorNotFound = new HttpError(`${this.#modelName} Not Found`, 404);
				// J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
				// toutes les instruction après le throw ne seront pas exécutées
				throw errorNotFound;
			}

			// 3. Répondre à la requete HTTP du client
			// end ==> méthode express pour indiquer "c'est fini" envois la réponse tel quel (avec le code 204)
			res.status(204).end();

		} catch (error) {
			next(error);
		}
	}


	create = async (req, res, next) => {

		try {
			// méthode pour ajouter un nouvel élément dans la BDD

			// 1. Récupérer le JSON qui est dans le body de la request
			const dataJson = req.body;

			// 2. Insérer les données dans la BDD
			const newElement = await this.#model.create(dataJson);

			// newElement est null ==> l'ajoute de l'élément a échoué
			if (!newElement) {

				// Error est une classe de Javascript pour gérer les erreur
				// Le constructeur de la classe Error permet de passer en argument un message d'erreur
				const errorNotFound = new HttpError(`Auncun ${this.#modelName} crée`, 500);
				// J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
				// toutes les instruction après le throw ne seront pas exécutées
				throw errorNotFound;
			}

			// 3. Répondre à la requete HTTP du client
			res.status(201).json(newElement);

		} catch (error) {
			next(error);
		}
	}


	// 3. Update (verbe HTTP path)
	// id de l'élément' à modifier se trouve dans l'URL
	// les nouvelles données de l'élément sont dans le body de la requete 
	update = async (req, res, next) => {

		try {

			// méthode pour ajouter un nouvel élément dans la BDD

			// 1. Récupérer le JSON qui est dans le body de la request
			const dataJson = req.body;

			// 2. Récupérer l'id dans l'URL
			const paramId = req.params.id;

			// 3. Update les données dans la BDD
			// https://sequelize.org/api/v6/class/src/model.js~model#static-method-update
			const result = await this.#model.update(dataJson,
				// WHERE id = paramId
				{
					where: { id: paramId },
					// retourne l'objet modifié
					returning: true
				}
			)

			// result[0] ==> nombre d'éléments modifiés
			// si aucune élément modifié, renvoie un 404
			if (0 === result[0]) {

				// Error est une classe de Javascript pour gérer les erreur
				// Le constructeur de la classe Error permet de passer en argument un message d'erreur
				const errorNotFound = new HttpError(`Aucun ${this.#modelName} modifié`, 404);
				// J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
				// toutes les instruction après le throw ne seront pas exécutées
				throw errorNotFound;
			}

			// 4. Répondre à la requete HTTP du client
			// J'envoi dans la réponse l'objet avec les nouvelles valeurs 
			res.status(200).json(result[1][0]);

		} catch (error) {
			next(error);
		}
	}

}

export default BaseController;