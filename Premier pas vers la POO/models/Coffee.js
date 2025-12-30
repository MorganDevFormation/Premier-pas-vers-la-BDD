// Ne pas oublier d'importer la connexion à la BBD
// copier depuis le datamapper et mettre à jour le chemin
import db from "../database/database-client.js";
import BaseModel from './BaseModel.js';

class Coffee extends BaseModel {

	// Attributs pirivés de la classe Coffee
	// #id;
	#name;
	#description;
	#reference;
	#price_per_kg;
	#available;

	// Constructeur de la classe Coffee
	constructor(_id, _name, _description, _reference, _price, _available) {
		// this.#id = _id;
		// appel le constructeur de la classe parente BaseModel
		super(_id);

		this.#name = _name;
		this.#description = _description;
		this.#reference = _reference;
		this.#price_per_kg = _price;
		this.#available = _available;
	}

	// Notation des getter et setter publics

	// get id() {
	//     return this.#id;
	// }

	// set id(newValue) {
	//     // To Do : ajouter les contraintes de validation de la newValue
	//     this.#id = newValue;
	// }

	get name() {
		return this.#name;
	}

	set name(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#name = newValue;
	}

	get description() {
		return this.#description;
	}

	set description(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#description = newValue;
	}

	get reference() {
		return this.#reference;
	}

	set reference(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#reference = newValue;
	}

	get price_per_kg() {
		return this.#price_per_kg;
	}

	set price_per_kg(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#price_per_kg = newValue;
	}

	get available() {
		return this.#available;
	}

	set available(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#available = newValue;
	}

	// Retourne le prix de l'objet Coffee sous forme de chaine de caractère bien formatée
	getFormatedPrice() {
		// To Do (pour bien plus tard): selon le pays du visiteur, convertir le prix dans d'autres monnaies
		return this.#price_per_kg.replace('.', ',') + '€/kg';
	}

	// Méthode pour basculer directement entre coffe disponible ou non
	toggleAvailable() {
		this.#available = !this.#available;
	}

	// Nom complet de cette méthode static
	// Coffee.getAll() 
	// Retourne toutes les coffes de la BDD
	static async getAll() {
		const result = await db.query(
			`SELECT * FROM coffee`
		);
		const products = result.rows;


		// map crée un nouveau tableau (coffees) avec tous les elements "return" dans map()
		const coffees = products.map((element) => {
			// ici element prend successivement la valeur de chaque objet du tabeau products 
			// renvoi le nouvel objet Coffe dans le tablea coffees
			return new Coffee(
				element.id,
				element.name,
				element.description,
				element.reference,
				element.price_per_kg,
				element.available);
		});

		// Retourne le tableau de coffees au controleur
		return coffees;
	}

	static async getById(id) {
		const result = await db.query(
			`SELECT * FROM coffee WHERE id = ${id}`
		);
		const product = result.rows[0];

		return new Coffee(
			product.id,
			product.name,
			product.description,
			product.reference,
			product.price_per_kg,
			product.available);
	}

	static async getByName(name) {
		const result = await db.query(
			`SELECT * FROM coffee WHERE name = ${name}`
		);
		const product = result.rows[0];

		return new Coffee(
			product.id,
			product.name,
			product.description,
			product.reference,
			product.price_per_kg,
			product.available);
	}

	// Cette méthode est static, donc pour l'appeller : 
	// Coffee.getLatestsProducts()
	static async getLatestsProducts() {
		const result = await db.query(
			`SELECT * FROM coffee ORDER BY created_at DESC LIMIT 3`
		);
		const products = result.rows;


		// map crée un nouveau tableau (coffees) avec tous les elements "return" dans map()
		const coffees = products.map((element) => {
			// ici element prend successivement la valeur de chaque objet du tabeau products 
			// renvoi le nouvel objet Coffe dans le tablea coffees
			return new Coffee(
				element.id,
				element.name,
				element.description,
				element.reference,
				element.price_per_kg,
				element.available);
		});

		console.log(coffees);

		// Retourne le tableau de coffees au controleur
		return coffees;
	}

	static async getAllAvailableProducts() {
		const sqlQuery = `SELECT * FROM "coffee" WHERE "available" = true;`;
		const result = await db.query(sqlQuery);
		// return result.rows;

		const products = result.rows;

		const coffees = products.map((element) => {
			// ici element prend successivement la valeur de chaque objet du tabeau products 
			// renvoi le nouvel objet Coffe dans le tablea coffees
			return new Coffee(
				element.id,
				element.name,
				element.description,
				element.reference,
				element.price_per_kg,
				element.available);
		});

		// Retourne le tableau de coffees au controleur
		return coffees;
	}
}

// Ne pas oublier l'export pour utiliser la classe dans le reste du code !
export default Coffee;