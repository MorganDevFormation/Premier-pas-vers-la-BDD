import { Sequelize, Model, DataTypes } from 'sequelize';
// import dotenv pour lire le fichier .env
import 'dotenv/config';

import sequelize from '../../database/sequelize-client.js';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example


// Déclare une classe du modèle
class Category extends Model {
	// Contenu de la class : vide, comme dans la doc
}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Category.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String
		name: DataTypes.STRING,
	},
	// modelName ==> nom de la table à créer
	// convention de nommage pour oCoffee : nom de table en minuscule
	{ sequelize, modelName: 'category' },
);


export default Category; 

