import sequelize from '../database/sequelize.client.js';

import { List, Card, Tag } from '../models/index.js';

import data from './data-examples.json' with { type: 'json' };

async function seed() {
    console.log('syncing database .....')
    try {

    // ** Reset de toute la BDD **
        await sequelize.sync({ force: true });

        // ===========
        // ** ELEMENTS JSON **
        // ===========
        const lists = data.lists
        const cards = data.cards
        const tags = data.tags
        const card_tag = data.card_tag;


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

        // ============
        // ** LIENS ENTRE CARD ET TAG **
        // ============

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
        