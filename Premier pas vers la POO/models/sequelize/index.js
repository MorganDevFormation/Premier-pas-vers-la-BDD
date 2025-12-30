// Dans ce fichier que je vais déclarer toutes les relations entre les modèles

import Country from './Country.js';
import Coffee from './Coffee.js';
import Category from './Category.js';

// ==============
// Association 1 - N (One To Many)
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
// ==============

// ** Association : 1 Coffee belongs To One Country **
Coffee.belongsTo(Country,
	// configuration de l'association
	{
		// nom de la colonne qui contient la clé étrangère
		foreignKey: 'country_id',
		// alias du nom de la relation entre coffee et country
		// belongs to : one country ==> donc alias = country au singulier
		as: 'country',
	});


// ** Association 1 Country has many Coffee **
Country.hasMany(Coffee,
	{
		// nom de la colonne qui contient la clé étrangère 
		// la même pour belongsTo Country
		foreignKey: 'country_id',
		// alias : has many Coffee ==> alias = coffees
		as: 'coffees',
	}
);

// ==============
// Association N - N (Many To Many )
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships
// ==============

// ** 1 Coffee belongs to many Categories **
// Pour la relation N - N entre Coffee et Category il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Coffee.belongsToMany(Category, {

	// Nom de la table pivot entre Coffee et Category
	through: 'coffee_category',
	
	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Coffee
	foreignKey: 'coffee_id',
	
	// clé étrangère dans la table pivot vers la table Category
	otherKey: 'category_id',
	
	// alias de l'association : 1 Coffee belongs to many categorie ==> donc *categories*
	as: 'categories'
});

// ** 1 Category belongs to many Coffees **
// Pour la relation N - N entre Category et Coffee il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Category.belongsToMany(Coffee, {

	// Nom de la table pivot entre Coffee et Category
	// ! Attention ! Il faut mettre le même nom de table pivot que dans le belongsToMany juste au dessus !
	through: 'coffee_category',

	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Category
	// Ici, mettre le même nom que *otherKey* définit plus haut 
	foreignKey: 'category_id',

	// clé étrangère dans la table pivot vers la table Coffee
	// Ici, mettre le même nom que *foreignKey* définit plus haut 
	otherKey: 'coffee_id',

	// alias de l'association : 1 Category belongs to many coffees ==> donc *coffees*
	as: 'coffees'
});


// Ici on fait l'export des Modèles enrichit de leurs relations entre eux eux
export { Country, Coffee, Category }