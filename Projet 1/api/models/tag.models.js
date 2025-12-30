import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from '../database/sequelize.client.js';

// Déclare une classe du modèle
class Tag extends Model {
	

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Tag.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Tag une colonne title de type String

		// La colonne s'appelle title
		name: {
			// type string
			type: DataTypes.STRING,
			// null interdit (oblige à avoir un titre)
			allowNull: false,
			//valeur par defaut
			unique: true,
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
	{ sequelize, modelName: 'tag' },
);

export default Tag;
