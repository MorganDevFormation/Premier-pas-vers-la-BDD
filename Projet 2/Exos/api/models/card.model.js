import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class Card extends Model {
	// Contenu de la class : vide, comme dans la doc

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Card.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String

		// La colonne s'appelle name
		content: {
			// type string
			type: DataTypes.TEXT,
			// null interdit
			allowNull: false,
		},
		position: {
			// reference CHAR(9) UNIQUE NOT NULL,
			type: DataTypes.INTEGER,
			// null interdit
			allowNull: false,
		},
		color: {
			// type string
			type: DataTypes.STRING(7),
			// null interdit
			allowNull: true,
			// valeur par défaut
			defaultValue: "#ffffff",
		},
	},
	// modelName ==> nom de la table à créer
	{ sequelize, modelName: 'card' },
);


export default Card;

