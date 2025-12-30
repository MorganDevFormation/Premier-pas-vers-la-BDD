// Schéma de construction de la classe CoreController
// Cette classe contient toutes les méthodes communes à tous les controller
class CoreController {

	// Fonction constructeur
	// Elle est appelée automatiquement à la création d'un nouvel objet CoreController
	// vocabulaire : objet = instance
	// Cette fonction sera appelée automatiquement quand on écrira "new CoreController"
	constructor() {
		// Ici le constructor ne fait rien
		// Je pourrai ne pas l'écrire

		console.log('Constructeur de CoreController');
	}


	// Méthode pour afficher la page 404 
	display404page(_req, res, _next) {
		// TO DO : gérer l'affichage de la page 404
		console.log('Gestion de la page 404');
		
		// Envoi code d'erreur 404 et la vue pages/error
		res.status(404).render("pages/error404");
	}

	// Méthode pour afficher la page 404 
	display500page(_req, res, _next) {
		// TO DO : gérer l'affichage de la page 500
		console.log('Gestion de la page 500');
		
		// Envoi code d'erreur 500 et la vue pages/error
		// TODO adapter la vue pour l'erreur 500
		res.status(500).render("pages/error500");
	}
}

// Export du schema de construction : la classe CoreController
export default CoreController; 	//  ==> import CoreController from "....CoreCOntroller.js"
