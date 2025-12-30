import { User } from '../models/index.js'
import HttpError from '../utils/HttpError.js';

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// import dotenv pour lire le fichier .env
import 'dotenv/config';

class AuthController {

	registerUser = async (req, res, next) => {

    try {

      // 1. récupérer le body de la requête
      // Dans le body j'attends les données du nouvel utilisateur à enregistrer
    const dataJson = req.body;

      // 2 Vérifier si le nom de l'utilisateur existe déjà dans la BDD
      // Si oui, refuser l'enregistrement et renvoyer une erreur 409
      // Rechercher dans la BDD un utilsateur par son username
      // SELECT * FROM user ... WHERE blabla 
	const result = await User.findOne(
        {
          // WHERE username = dataJson.username
        	where: { username: dataJson.username }
        }
    )
    	if (result) {
        // result n'est pas null ! J'ai déjà un utilisateur avec ce username dans la BDD
        throw new HttpError('Username already exists', 409);
    }

      // 3. Calculer le hash du mot de passe
    const hash = await argon2.hash(dataJson.password);

      // 4. Enregistrer le nouvel utilisateur dans la BDD avec le hash du mdp
    const newUser = await User.create(
        {
        	username: dataJson.username,
        	password: hash
        }
    );

      // 5. Si l'enregistrement a échoué ==> renvoyer une erreur 500
      // newUser est null ==> l'ajout de l'utilisateur a échoué
    	if (!newUser) {

        const errorNotFound = new HttpError(`Auncun utilisateur créé`, 500);
        // J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
        // toutes les instruction après le throw ne seront pas exécutées
        throw errorNotFound;
}

      // 6. Si l'enregistrement a réussi ==> renvoyer l'utilisateur avec un code 201
      // Juste renvoyer l'ID de l'utilisateur. Toutes les autres infos sont "trop" personnelles et ne doivent pas
      // circuler sur le réseau
    res.status(201).json(
        {
          // Je renvois uniquement l'ID du nouvel utilisateur
        	id: newUser.id
        }
    );

    } catch (error) {
    	next(error);
    }
}


	login = async (req, res, next) => {

    try {

      // 1. récupérer le body de la requête
      // Dans le body j'attends les données du nouvel utilisateur à enregistrer
      // dataJson = { username: "....", password: "....." }
    const dataJson = req.body;

      // 2. Chercher le user selon son nom
      // SELECT * FROM user ... WHERE username = dataJson.username
    const userFromBDD = await User.findOne(
        {
          // WHERE username = dataJson.username
        	where: { username: dataJson.username }
        }
    )
    	if (!userFromBDD) {
        // result est null ! L'utilisateur n'existe pas dans la BDD
        	throw new HttpError('login ou mot de passe incorrect', 401);
    	}

      // 3. Vérifier si le mot de passe de l'utilisateur correspond au hash mis dans la BDD
    	if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
        // Le mot de passe ne correspond pas !
        	throw new HttpError('login ou mot de passe incorrect', 401);
    	}

      // 4. Créer le token avec l'id de l'utilisateur
      // process.env.JWT_SECRET ==> va chercher le secret qui est dans .env
    const token = jwt.sign(
        // Les données à mettre dans le token ==> PAYLOAD (charge utile)
        {
        	user_id: userFromBDD.id
        },
        // Le secret pour calculer le token
        process.env.JWT_SECRET,
        // Date d'expiration du token : le token expire dans une heure !
        {
        	expiresIn: '1h'
        }
    );

      // 5. Réponse à la requete du client : 200 + le token
    	res.status(200).json( { token } );

		} catch (error) {
			next(error);
		}
	}

  getMe = async (req, res, next) => {

    try {
      // Récupère l'ID de l'utilisateur 
      // Il a été ajouté dans req par le middleware validateToken
      // L'id vient des données du token
      const userId = req.user_id;


      console.log('\nGET ME');

      // Chercher un utilisateur selon son ID
      // Retourne uniquement les informations du user SANS son Role
      // const user = await User.findByPk(userId);

      // Chercher un utilisateur par son ID avec son role 
      // WHERE id = <userId>
      const user = await User.findByPk(userId, 
        {
          // je veux que les colonnes id et username de la table User
          // cad, je veux pas la colonne password
          // SELECT id, username
          attributes: ['id', 'username'],
          // inlude => ajoute les données d'une autre table
          // JOINTURE INNER JOIN
          include: {
            // va chercher dans la table Role
            model: Role,
            // alias de l'association entre User et Role
            as: 'role',
            // Je veux QUE la colonne 'name' cas, je veux pas la colonne id
            // SELECT name FROM Role
            attributes: ['name']
          }
        }
      )

      // const response = {
      //   id: userId,
      //   username: 'Toto',
      //   role: { // crée un objet role comme si c'était un objet Role du Model
      //     name: 'user'
      //   }
      // }

      console.log(user.toJSON());

      res.status(200).json(user);
    
    } catch (error) {
      next(error);
    }
  }

}

// Export de l'objet controller en entier
const myController = new AuthController();
export default myController;