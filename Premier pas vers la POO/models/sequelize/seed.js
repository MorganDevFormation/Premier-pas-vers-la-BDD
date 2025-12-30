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
import { Country, Coffee, Category } from './index.js'

// Instance de Sequelize
import sequelize from '../../database/sequelize-client.js';


// ==============
// Je mets ici toutes les données à insérer dans la BDD
// Ça n'est pas du tout optimal ! Mais pour le moment on ne sait pas faire mieux... :/
// TODO : déplacer ces données dans un fichier .json et lire le json depuis seed.js
// ==============
const countries = [
	{ "name": "Italie" },
	{ "name": "Colombie" },
	{ "name": "Éthiopie" },
	{ "name": "Brésil" },
	{ "name": "Guatemala" },
	{ "name": "Kenya" },
	{ "name": "Indonésie" },
	{ "name": "Costa Rica" },
	{ "name": "Vietnam" },
	{ "name": "Tanzanie" },
	{ "name": "Jamaïque" },
	{ "name": "Rwanda" },
	{ "name": "Panama" },
	{ "name": "Pérou" },
	{ "name": "Hawaï" },
	{ "name": "Nicaragua" }
];

const categories = [
	{ "name": "Corsé" },
	{ "name": "Épicé" },
	{ "name": "Acide" },
	{ "name": "Doux" },
	{ "name": "Fruité" },
	{ "name": "Chocolaté" },
	{ "name": "Florale" }
];

const coffees = [
	{
		"name": "Espresso",
		"description": "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.",
		"reference": "100955890",
		"price_per_kg": 20.99,
		"available": true,
		"country": "Italie",
		"categories": ["Corsé"]
	},
	{
		"name": "Columbian",
		"description": "Café moyennement corsé avec une acidité vive et une saveur riche.",
		"reference": "100955894",
		"price_per_kg": 18.75,
		"available": true,
		"country": "Colombie",
		"categories": ["Corsé", "Acide"]
	},
	{
		"name": "Ethiopian Yirgacheffe",
		"description": "Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.",
		"reference": "105589090",
		"price_per_kg": 22.50,
		"available": true,
		"country": "Éthiopie",
		"categories": ["Florale", "Acide", "Fruité"]
	},
	{
		"name": "Brazilian Santos",
		"description": "Café doux et lisse avec un profil de saveur de noisette.",
		"reference": "134009550",
		"price_per_kg": 17.80,
		"available": true,
		"country": "Brésil",
		"categories": ["Doux", "Chocolaté"]
	},
	{
		"name": "Guatemalan Antigua",
		"description": "Café corsé avec des nuances chocolatées et une pointe d'épice.",
		"reference": "256505890",
		"price_per_kg": 21.25,
		"available": true,
		"country": "Guatemala",
		"categories": ["Corsé", "Chocolaté", "Épicé"]
	},
	{
		"name": "Kenyan AA",
		"description": "Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.",
		"reference": "295432730",
		"price_per_kg": 23.70,
		"available": true,
		"country": "Kenya",
		"categories": ["Fruité", "Acide"]
	},
	{
		"name": "Sumatra Mandheling",
		"description": "Café profond et terreux avec un corps lourd et une faible acidité.",
		"reference": "302932754",
		"price_per_kg": 19.95,
		"available": true,
		"country": "Indonésie",
		"categories": ["Corsé", "Doux"]
	},
	{
		"name": "Costa Rican Tarrazu",
		"description": "Café vif et net avec une finition propre et une acidité vive.",
		"reference": "327302954",
		"price_per_kg": 24.50,
		"available": true,
		"country": "Costa Rica",
		"categories": ["Acide", "Fruité"]
	},
	{
		"name": "Vietnamese Robusta",
		"description": "Café audacieux et fort avec une saveur robuste distinctive.",
		"reference": "549549090",
		"price_per_kg": 16.75,
		"available": true,
		"country": "Vietnam",
		"categories": ["Corsé"]
	},
	{
		"name": "Tanzanian Peaberry",
		"description": "Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.",
		"reference": "582954954",
		"price_per_kg": 26.80,
		"available": true,
		"country": "Tanzanie",
		"categories": ["Acide", "Fruité"]
	},
	{
		"name": "Jamaican Blue Mountain",
		"description": "Reconnu pour sa saveur douce, son acidité vive et son absence d'amertume.",
		"reference": "589100954",
		"price_per_kg": 39.25,
		"available": true,
		"country": "Jamaïque",
		"categories": ["Doux", "Acide"]
	},
	{
		"name": "Rwandan Bourbon",
		"description": "Café avec des notes florales prononcées, une acidité vive et un corps moyen.",
		"reference": "650753915",
		"price_per_kg": 21.90,
		"available": true,
		"country": "Rwanda",
		"categories": ["Florale", "Acide"]
	},
	{
		"name": "Panamanian Geisha",
		"description": "Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.",
		"reference": "795501340",
		"price_per_kg": 42.00,
		"available": true,
		"country": "Panama",
		"categories": ["Florale", "Acide"]
	},
	{
		"name": "Peruvian Arabica",
		"description": "Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.",
		"reference": "954589100",
		"price_per_kg": 19.40,
		"available": false,
		"country": "Pérou",
		"categories": ["Chocolaté", "Doux"]
	},
	{
		"name": "Hawaiian Kona",
		"description": "Café rare au goût riche, une acidité douce et des nuances subtiles.",
		"reference": "958090105",
		"price_per_kg": 55.75,
		"available": false,
		"country": "Hawaï",
		"categories": ["Doux", "Florale"]
	},
	{
		"name": "Nicaraguan Maragogipe",
		"description": "Café avec des notes de fruits, une acidité vive et un corps plein.",
		"reference": "691550753",
		"price_per_kg": 28.60,
		"available": false,
		"country": "Nicaragua",
		"categories": ["Fruité", "Acide"]
	}
];

async function run() {

	// ** Reset de toute la BDD **
	await sequelize.sync({ force: true });


	// =============
	// ** Insertion des Countries **
	// =============

	// On parcours le tableau *countries* défini au début du fichier pour insérer les pays un par un
	for (let country of countries) {

		// Chaque country est un objet littéral qui est de la forme suivante : { "name": "<nom du pays>" },
		// Je peux donc l'utiliser directement pour créer un nouveau pays dans la base
		await Country.create(country);
	}

	// =============
	// ** Insertion des Categories **
	// =============

	// On parcours le tableau *categories* défini au début du fichier pour insérer les categories une par une
	for (let category of categories) {

		// Chaque country est un objet littéral qui est de la forme suivante : { "name": "<nom de de la categorie>" },
		// Je peux donc l'utiliser directement pour créer un nouvelle categories dans la base
		await Category.create(category);
	}

	// =============
	// ** Insertion des Coffees **
	// =============

	// objet Coffee inséré dans la BDD
	let insertedCoffee = {};

	// nom d'un pays
	let countryName = '';
	// instance de Country de la BDD
	let foundCountry = {};

	// instance de Category de la BDD
	let foundCategory = {};

	// On parcours le tableau *coffees* défini au début du fichier pour insérer les categories une par une
	for (let coffee of coffees) {

		// Chaque country est un objet littéral qui est de la forme suivante : 
		// {
		// 	"name": "Espresso",
		// 	"description": "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.",
		// 	"reference": "100955890",
		// 	"price_per_kg": 20.99,
		// 	"available": true,
		// 	"country": "Italie",
		// 	"categories": ["Corsé"]
		// }

		// Enregistrer un nouveau Coffee
		insertedCoffee = await Coffee.create(coffee);

		// =============
		// ** Faire le lien entre le coffee est son pays **
		// =============

		// Rappel, l'objet littéral coffee contient une clé "country" avec une valeur qui est le nom du pays du coffee 
		// {
		// 	"name": "Espresso",
		// 	"description": "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.",
		// 	"reference": "100955890",
		// 	"price_per_kg": 20.99,
		// 	"available": true,
		// ==> "country": "Italie", <==
		// 	"categories": ["Corsé"]
		// }

		// 1 Récupérer le nom du pays dans l'objet coffee (clé "country")
		countryName = coffee.country;

		// 2 Chercher le pays par son nom dans la BDD
		// Utiliser la méthode finddOne et ajouter une contrainte where
		// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone
		foundCountry = await Country.findOne(
			{ where: { name: countryName } }
		);

		// 3 Vérifier que le pays existe bien
		if (null === foundCountry) {
			console.log(`Pays ${countryName} Not Found :/`);
		} else {
			// 4 Associer le Coffee avec son Country
			await insertedCoffee.setCountry(foundCountry);

			// Alternative : ajouter le Coffee dans la liste du Country
			// foundCountry.addCoffee(insertedCoffee);
		}


		// =============
		// ** Faire le lien entre Coffee est les Category **
		// =============

		// Rappel, l'objet littéral coffee contient une clé "categories" avec une valeur un tableau de nom de Categorie
		// Il va falloir parcourir la liste des catégories une par une est l'associer au Coffee 
		// {
		// 	"name": "Espresso",
		// 	"description": "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.",
		// 	"reference": "100955890",
		// 	"price_per_kg": 20.99,
		// 	"available": true,
		//    "country": "Italie", 
		// ==> "categories": ["Corsé"] <==
		// }


		// 1. Parcourir la liste des categories du coffee
		for (let categoryName of coffee.categories) {

			// 2 Chercher la catagorie par son nom dans la BDD
			// Utiliser la méthode finddOne et ajouter une contrainte where
			// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone
			foundCategory = await Category.findOne(
				{ where: { name: categoryName } }
			);

			// 3 Vérifier que la categorie existe bien
			if (null === foundCategory) {
				console.log(`Category ${categoryName} Not Found :/`);
			} else {
				// 4 Associer le Coffee avec sa Category
				// La méthode addCategory modifie directement la table pivot !
				await insertedCoffee.addCategory(foundCategory);

				// Alternative : ajouter le Coffee dans la liste des Category
				// La méthode addCoffee modifie directement la table pivot !
				// foundCategory.addCoffee(insertedCoffee);
			}
		}
	}
}

await run();