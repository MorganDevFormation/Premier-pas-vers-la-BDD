// Dans ce fichier que je vais déclarer toutes les relations entre les modèles

import List from './list.models.js';
import Card from './card.models.js';
import Tag from './tag.models.js';


// ==============
// Association 1 - N (One To Many)
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
// ==============

// ** Association : 1 Card belongs To One List **
Card.belongsTo(List,
	// configuration de l'association
	{
		// nom de la colonne qui contient la clé étrangère
		foreignKey: 'list_id',
		// alias du nom de la relation entre card et list
		// belongs to : one list ==> donc alias = list au singulier
		as: 'list',
	});


// ** Association 1 List has many Card **
List.hasMany(Card,
	{
		// nom de la colonne qui contient la clé étrangère 
		// la même pour belongsTo Card
		foreignKey: 'list_id',
		// alias : has many Card ==> alias = cards
		as: 'cards',
	}
);


// ==============
// Association N - N (Many To Many )
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships
// ==============

// ** 1 Card belongs to many Tags **
// Pour la relation N - N entre Card et Tag il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Card.belongsToMany(Tag, {

	// Nom de la table pivot entre Coffee et Category
	through: 'card_tag',
	
	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Card
	foreignKey: 'card_id',
	
	// clé étrangère dans la table pivot vers la table Tag
	otherKey: 'tag_id',
	
	// alias de l'association : 1 Card belongs to many Tag ==> donc *tags*
	as: 'tags'
});

// ** 1 Tag belongs to many Card **
// Pour la relation N - N entre Tag et Card il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Tag.belongsToMany(Card, {

	// Nom de la table pivot entre Card et Tag
	// ! Attention ! Il faut mettre le même nom de table pivot que dans le belongsToMany juste au dessus !
	through: 'card_tag',

	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Tag
	// Ici, mettre le même nom que *otherKey* définit plus haut 
	foreignKey: 'tag_id',

	// clé étrangère dans la table pivot vers la table Card
	// Ici, mettre le même nom que *foreignKey* définit plus haut 
	otherKey: 'card_id',

	// alias de l'association : 1 Card belongs to many cards ==> donc *cards*
	as: 'cards'
});



// Ici on fait l'export des Modèles enrichit de leurs relations entre eux eux
export { List, Card, Tag }