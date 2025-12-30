// ==============
// **
// Comment utiliser ce fichier pour faire un reset de la BDD et insérer les données avec Sequelize ?
// 
// Depuis la racine du projet, lancer la commande suivante : node ./models/sequelize/seed.js
// **
// ==============


// Ici on importe les modèles "seuls" sans leurs associations
// import Country from './Country.js'
// import Coffee from './Coffee.js'

// Modèles avec leurs associations
//import { Country, Coffee, Category } from './index.js'

import List from '../models/list.models.js';

// Instance de Sequelize
import sequelize from '../database/sequelize.client.js';
import Card from '../models/card.models.js';
import Tag from '../models/tag.models.js';


// ==============
// Je mets ici toutes les données à insérer dans la BDD
// Ça n'est pas du tout optimal ! Mais pour le moment on ne sait pas faire mieux... :/
// TODO : déplacer ces données dans un fichier .json et lire le json depuis seed.js
// ==============

const lists = [
	{
		"title": "titi",
		"position": 1
	},
    {
		"title": "toto",
		"position": 2
	},
    {
		"title": "tata",
		"position": 3
	},
    {
		"title": "tonton",
		"position": 4
	},
    {
		"title": "tutu",
		"position": 5
	},
	
];

const cards = [
	{
		"content": 'description',
		"position": 1,
	},
	{
		"content": 'description',
		"position": 2,
	},
	{
		"content": 'description',
		"position": 3,
	},
	{
		"content": 'description',
		"position": 4,
	}
];

const tags = [
	{
		"name": "bob",
		"position": 1,
	},
	{
		"name": "henry",
		"position": 2,
	},{
		"name": "emma",
		"position": 3,
	},{
		"name": "charlie",
		"position": 4,
	}
];

async function run() {

	// ** Reset de toute la BDD **
	await sequelize.sync({ force: true });


	// =============
	// ** Insertion des Listes **
	// =============

	// On parcours le tableau *Lists* défini au début du fichier pour insérer les listes une par une
	for (let list of lists) {

		// Chaque list est un objet littéral qui est de la forme suivante : { "title": "<titre de la liste>" },
		// Je peux donc l'utiliser directement pour créer une nouvelle liste dans la base
		await List.create(list);
	}

	// =============
	// ** INSERTION DES CARDS
	// =============

	// On parcours le tableau *Cards* défini au début du fichier pour insérer les cartes une par une
	for (let card of cards) {

		// Chaque list est un objet littéral qui est de la forme suivante : { "title": "<titre de la liste>" },
		// Je peux donc l'utiliser directement pour créer une nouvelle liste dans la base
		await Card.create(card);
	}

	// =============
	// ** INSERTION DES TAGS
	// =============

	// On parcours le tableau *Tags* défini au début du fichier pour insérer les tags une par une
	for (let tag of tags) {

		// Chaque list est un objet littéral qui est de la forme suivante : { "title": "<titre de la liste>" },
		// Je peux donc l'utiliser directement pour créer une nouvelle liste dans la base
		await Tag.create(tag);
	}

}

await run();