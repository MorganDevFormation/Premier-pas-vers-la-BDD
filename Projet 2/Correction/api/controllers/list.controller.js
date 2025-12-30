import { List, Card, Tag } from '../models/index.js';

import BaseController from './base.controller.js';

class ListController extends BaseController {

	constructor() {
		// super ==> méthode pour appeler le constructeur de la classe parent
		super(List, 'list');
	}

	// ==========================
	// Méthode getRequestOptions(req)
	// ==========================
	// Redéfinition de la méthode getRequestOptions de la classe parente BaseController
	// Le controleur va utiliser cette "version" de cette méthode lors de l'exécution des méthodes "getAll" et "getById".
	// -----------
	getRequestOptions(req) {

		// Tableau d'options à retourner, vide pour le moment
		const options = [];

		// Récupère le query avec la clé include si elle existe ==> ?.split
		// Split de la valeur de query.include 
		// Si la valeur de query.include est "cards" ==> retourne ["cards"]
		// Si la valeur de query.include est "cards,tags" ===> retourne ["cards","tags"]
		const includeModels = req.query.include?.split(',');

		// Est-ce que contient includeModels la string "cards" ? 
		if (includeModels?.includes('cards')) {

			// Oui, donc on crée un objet littéral avec le modèle Card et l'alias de l'association List <-> Card (voir models/index.js) 
			const cards = { model: Card, as: "cards", };

			// Est-ce que contient includeModels la string "tags" ? 
			if (includeModels?.includes('tags')) {

				// Oui, donc on crée un objet littéral avec le modèle Tag et l'alias de l'association Card <-> tags (voir models/index.js)
				const tags = {
					model: Tag,
					as: "tags",
					// Indique à Sequelize que je ne veux aucun attribut de la table pivot entre Card et Tag
					through: {
						// tableau vide : ajouter aucune colonne de la table pivot
						attributes: []
					}
				};

				// Enregistre l'objet tags, dans l'objet cards avec la clé "include"
				cards.include = tags;
			}

			// Ajoute l'objet cards dans le tableau à retourner
			options.push(cards);

		}

		// Retourne le tableau d'option :
		return options;
	};


	getAllCardsByListId = async (req, res, next) => {

		try {

			// SELECT récupérer uniquement toutes les cartes d'une liste, sans la liste
			const results = await Card.findAll(
				{
					where: {
						list_id: req.params.id
					}
				}
			);

			// Renvois la réponse code 200 avec tous les résultats de la requete SQL au format JSON
			res.status(200).json(results);

		} catch (error) {
			next(error);
		}
	}
}

// Export de l'objet controller en entier
const myController = new ListController();
export default myController;