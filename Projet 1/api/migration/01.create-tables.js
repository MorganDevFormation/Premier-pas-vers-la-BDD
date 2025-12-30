/* Modèles avec leurs associations
import List  from '../models/list.models.js';
import Card from '../models/card.models.js';
import Tag from '../models/tag.models.js';
*/

import { List, Card, Tag } from '../models/index.js';


// Instance de Sequelize
import sequelize from '../database/sequelize.client.js';

async function run() {

	// ** Reset de toute la BDD **
	await sequelize.sync({ force: true });

}

await run();