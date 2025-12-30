import { Router } from "express";

// import d'une instance de ProductController
// productController est une instance de la classe ProductController 
// import listController from "../controllers/list.controller.js";
import cardTagController from "../controllers/card_tag.controller.js";

// import middleware pour valider les données
import { validateId } from "../middlewares/common.middleware.js";
import { validateIdCardAndIdTag, validateCardTagId, validateCardTagList } from "../middlewares/card_tag.middleware.js";


const router = Router();

// Ajouter un tag existant dans la liste d'une carte existant
// le tag doit déjà exister dans la BDD
// la carte doit déjà exister dans la BDD
// L'id de la carte est dans l'URL de la requete : :id
// l'id du tag à ajouter est dans le body de la requete : { id : <id du tag }
router.post("/cards/:id/tags", validateId, validateCardTagId, cardTagController.addTag);

// Modifier la liste de tous les tag d'un carte
// la carte doit déjà exister dans la BDD. l'id de la carte est dans l'URL :id
// les tags doivent déjà exister dans la BDD. 
// Les id des tags à ajouter sont dans le body de la requete : { ids: [ id des tags ] }
router.put("/cards/:id/tags", validateId, validateCardTagList, cardTagController.updateTagList);

// Supprimer un tag d'une carte
// l'id de la carte est dans l'URL :idCard
// l'id du tag est dans l'URL :idTag
router.delete("/cards/:idCard/tags/:idTag", validateIdCardAndIdTag, cardTagController.deleteTag);


export default router;
