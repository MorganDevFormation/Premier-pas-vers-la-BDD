import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class User extends Model {
	// Contenu de la class : vide, comme dans la doc

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
// CREATE TABLE
User.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String

		// La colonne s'appelle name
		username: {
			// type string
			type: DataTypes.STRING,
			// null interdit
			allowNull: false,
			unique: true
		},
		password: {
			// reference CHAR(9) UNIQUE NOT NULL,
			type: DataTypes.STRING,
			// toutes les valeurs sont uniques
			// unique: true, // ==> va poser des problèmes avec le front lors du déplacement d'une liste
			// null interdit
			allowNull: false,
			// valeur par défaut
			// defaultValue: 1,
		},
	},
	// modelName ==> nom de la table à créer
	{ sequelize, modelName: 'user' },
);


export default User;


