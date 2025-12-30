import Coffee from "../models/Coffee.js";
import db from "./database-client.js";

const datamapper = {

	async getAllCategories() {
		const sqlQuery = 'SELECT * FROM "category";';
		const result = await db.query(sqlQuery);
		return result.rows;
	},

	async getProductById(id) {
		const sqlQuery = `
      SELECT 
        coffee.*, 
        array_agg(category.name) AS categories,
        country.name AS origin_country
      FROM 
        coffee 
      JOIN 
        coffee_category ON coffee.id = coffee_category.coffee_id
      JOIN 
        category ON coffee_category.category_id = category.id
      JOIN
        country ON coffee.country_id = country.id
      WHERE 
        coffee.id = $1
      GROUP BY 
        coffee.id, country.name
      ;
    `;
		const result = await db.query(sqlQuery, [id]);
		return result.rows[0];
	},
};

export default datamapper;
