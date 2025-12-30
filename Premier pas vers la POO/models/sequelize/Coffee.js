import { Sequelize, Model, DataTypes } from 'sequelize';
// import dotenv pour lire
import 'dotenv/config';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from '../../database/sequelize-client.js';

// Déclare une classe du modèle
class Coffee extends Model {
	// Contenu de la class : vide, comme dans la doc

	// ** Les méthodes de l'ancien modèle qui seront utilisée dans la vue **
	// ** Avec les modèles Sequelize on passe par des attributs public **

	// Retourne le prix de l'objet Coffee sous forme de chaine de caractère bien formatée
	getFormatedPrice() {
		// To Do (pour bien plus tard): selon le pays du visiteur, convertir le prix dans d'autres monnaies
		return this.price_per_kg.replace('.', ',') + '€/kg';
	}

	// Méthode pour basculer directement entre coffe disponible ou non
	toggleAvailable() {
		this.available = !this.available;
	}
}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Coffee.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String

		// La colonne s'appelle name
		name: {
			// type string
			type: DataTypes.STRING,
			// toutes les valeurs sont uniques
			unique: true,
			// null interdit
			allowNull: false,
		},
		description: DataTypes.STRING,
		reference: {
			// reference CHAR(9) UNIQUE NOT NULL,
			type: DataTypes.CHAR(9),
			// toutes les valeurs sont uniques
			unique: true,
			// null interdit
			allowNull: false,
		},
		price_per_kg: DataTypes.DECIMAL,
		available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false 
		}

	},
	// modelName ==> nom de la table à créer
	// convention de nommage pour oCoffee : nom de table en minuscule
	{ sequelize, modelName: 'coffee' },
);


export default Coffee;

