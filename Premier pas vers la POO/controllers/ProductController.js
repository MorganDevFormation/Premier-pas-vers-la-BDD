import datamapper from "../database/main-datamapper.js";

// Vieux modèles 
// import Coffee from '../models/Coffee.js';

// Modèle construits avec Sequelize, à importer depuis le fichier index.js ! 
import { Coffee, Category, Country } from '../models/sequelize/index.js';

// Ne pas oublier d'importer la classe parente
import CoreController from "./CoreController.js";

// Rappel différence const VS let
// const a = 2;
// a = 3; // ERROR : je suis un menteur, j'ai dit que a était invariable
// let b = 2;
// b = 3; // OK : car j'ai dit que b est une variable, sa valeur peut changer dans le temps


// { } ==> ça me dit que mainController est un objet littéral
// objet littéral = un objet qui n'appartient à aucune class, créé directement sans mot clé *new*
// const mainController = {

// La classe ProductionController herite de CoreController
// Toutes les méthodes définies dans CoreCentroller sont utilisables dans ProductController 
class ProductController extends CoreController {

	// Liste de toutes les méthodes disponibles dans ProductController
	// - renderHomePage
	// - renderCatalogPage
	// - renderCoffeeDetailsPage
	// - le constructeur de ProductController
	// - display404page héritée de CoreController
	// - le constructeur de CoreController ==> qu'on peut appeler avec le mot clé super()

	// Constructeur de la ProductController
	constructor() {
		// super() est la première instruction du constructeur de la classe fille (enfant)
		super(); // appel le constructeur de la classe parente (CoreController)

		console.log('Constructeur de ProductController');
	}

	// Définition fonction classique
	// async renderHomePage(req, res, next) {
	// Définition fonction fléchées
	renderHomePage = async (req, res, next) => {
		try {
			// Ancienne méthode 
			// const articles = await Coffee.getLatestsProducts();

			// Avec le Model Sequelize
			// On utilise la fonction magique findAll avec deux contraintes : order et limites
			// Doc Sequelize : https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering-and-grouping
			const articles = await Coffee.findAll(
				{
					order: [['created_at', 'DESC']],
					limit: 3
				}
			);

			res.render("pages/home", { articles });
		} catch (error) {
			console.error(error);
			// res.status(500).render("pages/error");
			this.display500page(req, res, next);

			// Ici le return est superflu, 
			// Aucune instruction à ajouter après display500page
			return;
		}
	}

	// Définition méthode classique
	// async renderCatalogPage(req, res, next) {
	// Définition fonction fléchée
	renderCatalogPage = async (req, res, next) => {
		try {
			// Anciennes méthodes
			// const articles = await Coffee.getAllAvailableProducts();
			// const categories = await datamapper.getAllCategories();

			// Méthode magique findAll avec un where pour filter uniquement des Coffee available
			const articles = await Coffee.findAll({
				where: { available: true, },
			});

			// Méthode magique findAll sur Category pour récupérer toutes les catégories
			const categories = await Category.findAll();

			res.render("pages/catalog", { articles, categories });
		} catch (error) {
			console.error(error);
			// res.status(500).render("pages/error");
			this.display500page(req, res, next);
			return;
		}
	}

	// Fonction "classique"
	// async renderCoffeeDetailsPage(req, res, next) {
	// Même nom, définie avec une fonction fléchée
	renderCoffeeDetailsPage = async (req, res, next) => {
		// Essaye d'exécuter le code qui suit
		try {
			// 1 récupère id qui est dans l'URL
			const articleId = parseInt(req.params.id);

			// Cas d'erreur 1 : articleId n'est pas un nombre 
			if (isNaN(articleId)) {
				// Exemple le visiteur demande la page /article/toto
				// alors articleId = "toto"
				// "toto" n'est pas un entier (is Not a Number) ==> donc on rentre dans ce if
				// cas d'erreur 404
				console.log(`articleId n'est pas un nombre ${articleId}`);
				// return next();

				// Appel la méthode display404page() définie dans la classe parente
				// Depuis this ==> cad l'objet qui exécute le code 
				this.display404page(req, res, next);

				// Arrête l'exécution de la méthode
				// Ça ne sert  à rien de continuer, articleId n'est pas un entier
				return;
			}

			// Appel le data mapper pour faire un SELECT
			// Ancienne méthode
			// const article = await datamapper.getProductById(articleId);

			// Avec Sequelize, récupérer un Coffee avec la méthode magique findByPk ==> find by primary key
			// On ajoute une option "include" pour demander à Sequelize ajouter Country et Category dans le résultat 
			const article = await Coffee.findByPk(1, {
				// Je peux en plus les informations qui viennent d'autres Modèles
				include: [
					{
						// 1. Les informations qui modèle Country
						model: Country,
						// Alias de la relation entre Coffee -> Country (index.js)
						as: 'country'
					}, // inclure le pays associé
					{
						// 2. Les informations du modèle Category
						model: Category,
						// Alias de la relations Coffee -> Category (index.js)
						as: 'categories'
					} // inclure les catégories
				]
			});

			// Cas d'erreur 2 : article n'existe pas dans la BDD 
			if (!article) {
				// Article pas trouvé ==> error 404
				// return next();
				this.display404page(req, res, next);

				// Quitte la fonction, on n'a rien à faire de plus ici
				return;
			}

			// Ici tout va bien : articleId est bien un entier
			// ET article existe dans la BDD
			res.render("pages/article", { article });

		} catch (error) {
			console.error(error);
			// res.status(500).render("pages/error");
			this.display500page(req, res, next);
			return;
		}
	}
};

// mainController = 'MOn controller'; // ERROR : j'ai dit que mainController est invariable (const)


// Initialement on exportait mainController qui est un objet littéral
// un objet "orphelin" qui n'appartient pas à une classe
// export default mainController;

// Ici on export la classe ProductController
// export default ProductController; // ERROR : ça ne peux pas fonctionner car le router attends un objet et non une classe

// j'exporte une classe ProductController ==> cad j'exporte un plan de construction
// Seulement le router attends un objet : une instance de la classe ProductController
// 1. créer une nouvelle instance de ProductController
const productController = new ProductController(); // appel le constructeur (vide) de ProductController 

// 2. exporter cette instance (cet objet appelé productController)
export default productController;

// Alternative plus courte
// export default new ProductController();