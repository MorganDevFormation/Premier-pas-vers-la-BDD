Instruction Install Sequelize
=====

https://sequelize.org/docs/v6/getting-started/

1. Installer la dépendance à Sequelize

`npm install --save sequelize`

2. Installer le driver de connexion à la BDD PostgreSQL

`npm install --save pg pg-hstore`

3. Créer le fichier `database/sequelize-client.js`

Coller dans le fichier le code proposé dans la doc

```js
// require : equivalent de import, mais fourni par Node.js
// const { Sequelize } = require('sequelize');

// import : code natif JS
// require "à l'ancienne" de sequelize
import { Sequelize } from 'sequelize';


// import dotenv pour lire le fichier .env
import 'dotenv/config'; 

// On récupère la string DATABASE_URL écrite dans le .env
const sequelize = new Sequelize(process.env.DATABASE_URL)

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}
```

4. Tester la connexion à la BDD

`node ./database/sequelize-client.js`

Si le terminal affiche les lignes suivante : 

```
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
```

*La connexion est bien établie !*