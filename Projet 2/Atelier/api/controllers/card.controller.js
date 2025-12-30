import { Card, Tag } from '../models/index.js';
import BaseController from './base.controller.js';

class CardController extends BaseController {

	constructor() {
		// super ==> méthode pour appeler le constructeur de la classe parent
		super(Card, 'card');
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

		// Est-ce que query contient la clé "include" et la valeur "tags" ? 
		if (req.query.include && 'tags' === req.query.include) {

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

			// Ajoute l'objet tags, dans le tableau options
			options.push(tags);

			// Retourne le tableau d'option
			return options;
		}

	}
}

// Export de l'objet controller en entier
const myController = new CardController();
export default myController;