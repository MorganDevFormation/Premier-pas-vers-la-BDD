import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Récup de la string DATABASE_URL du dossier .env
console.log("DATABASE_URL =", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {

    define: {           // configure le comportement par défaut sequelize

        freezeTableName: true,          // pas de nom de table au pluriel
        timestamps: true,        // ajout les colonnes createAdt et updateAdt à chaque table
        underscored: true,       // utilise le snake_case pour les champs auto-générés
    },
})

try {

    await sequelize.authenticate();

    console.log('connexion établie !!!!')

} catch (error) {
    
    console.error(' impossible de se connecter à la bas de donnée', error)
}

export default sequelize