// Dans ce fichier que je vais déclarer toutes les relations entre les modèles

import List from './list.model.js';
import Card from './card.model.js';
import Tag from './tag.model.js';

// ==============
// Association 1 - N (One To Many)
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
// ==============

// ** Association : 1 Card belongs To One List **
// 1 Card appartient à 1 List
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
// 1 List possede plusieurs Card
List.hasMany(Card,
	{
		// nom de la colonne qui contient la clé étrangère 
		// la même pour belongsTo Card
		foreignKey: 'list_id',
		// alias : has many Card ==> alias = cards
		// plusieurs card, donc card au pluriel
		as: 'cards',
	}
);

// ==============
// Association N - N (Many To Many )
// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships
// ==============

// ** 1 Card belongs to many Tag **
// Pour la relation N - N entre Card et Tag il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Card.belongsToMany(Tag, {

	// Nom de la table pivot entre Card et Tag
	through: 'card_tag',
	
	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table card
	foreignKey: 'card_id',
	
	// clé étrangère dans la table pivot vers la table tag
	otherKey: 'tag_id',
	
	// alias de l'association : 1 Card belongs to many Tag ==> donc tag au pluriel *tags*
	as: 'tags'
});

// ** 1 Tag belongs to many Card **
// Pour la relation N - N entre Tag et Card il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Tag.belongsToMany(Card, {

	// Nom de la table pivot entre Coffee et Category
	// ! Attention ! Il faut mettre le même nom de table pivot que dans le belongsToMany juste au dessus !
	through: 'card_tag',

	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Category
	// Ici, mettre le même nom que *otherKey* définit plus haut 
	foreignKey: 'tag_id',

	// clé étrangère dans la table pivot vers la table Coffee
	// Ici, mettre le même nom que *foreignKey* définit plus haut 
	otherKey: 'card_id',

	// alias de l'association : 1 Tag belongs to many Card ==> donc plusieurs Card *cards*
	as: 'cards'
});


// Ici on fait l'export des Modèles enrichit de leurs relations entre eux eux
export { List, Card, Tag }