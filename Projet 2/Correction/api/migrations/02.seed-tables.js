// seed.js
import sequelize from '../models/sequelize.client.js';

import { List, Card, Tag } from '../models/index.js';

// Import des json pour seed la BDD
import data from './data-examples.json' with { type: 'json'};

async function seed() {
	console.log('Syncing database...');

	try {
		// force: true va DROP les tables avant de les recréer. Pour le dev uniquement !
		// await sequelize.sync({ force: true }); 

		// ==============
		// ** éléments du JSON
		// ==============

		const lists = data.lists;
		const cards = data.cards;
		const tags = data.tags;
		const card_tag = data.card_tag;

		// =================
		// ** import des lists
		// =================

		for (let list of lists) {
			// INSERT
			await List.create(list);
		}

		// =================
		// ** import des cards
		// =================

		for (let card of cards) {
			// INSERT
			await Card.create(card)
		}

		// =================
		// ** import des tags
		// =================

		for (let tag of tags) {
			// INSERT
			await Tag.create(tag)
		}

		// =================
		// ** Liens entre card et tags
		// =================

		// Objet Card initialisé à null
		let myCard = null;

		// Objet Tag initialisé à null
		let myTag = null;

		for (let element of card_tag) {

			// Pour chaque "element" : {card_id, tag_id}
			// Faire une recherche dans la BDD pour récupérer un objet Card grace à card_id
			// Faire une recherche dans la BDD pour récupérer un objet Tag grace a tag_id
			// Faire le lien entre l'objet Card et l'objet Tag 

			// Recherche dans la BDD de la Card à modifier
			// SELECT
			myCard = await Card.findByPk(element.card_id);

			if (myCard) {

				// recherche dans la BDD du tag 
				// SELECT
				myTag = await Tag.findByPk(element.tag_id);

				if (myTag) {
					// La Card et le Tag existent.
					// Je peux ajouter le Tag dans la liste des tags pour la Card 

					// Méthode magique fournie par Sequelize au moment où on a déclaré Card Belongs To Many Tag
					await myCard.addTag(myTag);
				} else {
					throw Error('myTag is null')
				}
			} else {
				throw Error('myCard is null')
			}
		}

		console.log('✅ Seeding complete!');

	} catch (error) {
		console.log('Error seeding BDD', error);
	} finally {
		// Ferme la connexion à la BDD
		await sequelize.close();
	}
}

await seed();