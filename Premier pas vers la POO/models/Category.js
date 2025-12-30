import BaseModel from './BaseModel.js';
import db from "../database/database-client.js";

class Category extends BaseModel {

	#name;

	constructor(_id, _name) {
		super(_id);

		this.#name = _name;
	}

	get name() {
		return this.#name;
	}

	set name(newValue) {
		// To Do : ajouter les contraintes de validation de la newValue
		this.#name = newValue;
	}


	// Nom complet de cette méthode static
	// Category.getAll() 
	// Retourne toutes les catégories de la BDD
	static async getAll() {
		const result = await db.query(
			`SELECT * FROM category`
		);

		// map crée un nouveau tableau (coffees) avec tous les elements "return" dans map()
		const categories = result.rows.map((element) => {
			return new Category(
				element.id,
				element.name);
		});

		// Retourne le tableau de coffees au controleur
		return categories;
	}

	static async getById(id) {
		const result = await db.query(
			`SELECT * FROM category WHERE id = ${id}`
		);

		return new Category(
			result.rows[0].id,
			result.rows[0].name);
	}

	static async getByName(name) {
		const result = await db.query(
			`SELECT * FROM category WHERE name = ${name}`
		);

		return new Category(
			result.rows[0].id,
			result.rows[0].name);
	}
}

export default Category;