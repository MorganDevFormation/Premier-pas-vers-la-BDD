import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from '../database/sequelize.client.js';

// Déclare une classe du modèle
class Card extends Model {
	

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Card.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Tag une colonne title de type String

		// La colonne s'appelle title
		content: {
			// type string
			type: DataTypes.STRING,
			// null interdit (oblige à avoir un titre)
			allowNull: false,
		},
		position: {
            type: DataTypes.INTEGER,
            // null interdit
            allowNull: false,
            // valeur par défaut
            defaultValue: 1
        },
		color: {
			// type string
			type: DataTypes.STRING,
			// null interdit (oblige à avoir un titre)
			allowNull: true,
		},

	},
	// modelName ==> nom de la table à créer
	// convention de nommage pour okanban : nom de table en minuscule
	{ sequelize, modelName: 'card' },
);

export default Card;
