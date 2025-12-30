import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class Tag extends Model {
	// Contenu de la class : vide, comme dans la doc

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
// CREATE TABLE
Tag.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String

		// La colonne s'appelle name
		name: {
			// type string
			type: DataTypes.STRING,
			// null interdit
			allowNull: false,
			unique: true,
		},
		color: {
			// type string
			type: DataTypes.STRING(7),
			// null interdit
			allowNull: true,
			defaultValue: "#ffffff"
		},
	},
	// modelName ==> nom de la table à créer
	{ sequelize, modelName: 'tag' },
);


export default Tag;

