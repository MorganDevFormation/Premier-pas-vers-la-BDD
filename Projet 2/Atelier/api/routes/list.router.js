import { Router } from "express";

// import d'une instance de ProductController
import listController from "../controllers/list.controller.js"; 

import { validateId } from '../middlewares/common.middleware.js';
import { validateListCreate, validateListUpdate } from '../middlewares/list.middleware.js';

const router = Router();

// requete HTTP GET
router.get("/lists/", listController.getAll);
// requete HTTP GET
router.get("/lists/:id", validateId, listController.getById);
// requete HTTP DELETE
router.delete("/lists/:id", validateId, listController.delete);
// requete HTTP POST
router.post("/lists", validateListCreate, listController.create);
// requete HTTP PATCH
router.patch("/lists/:id", validateId, validateListUpdate, listController.update);

// requete HTTP GET uniquement les cartes d'une liste (sans les informations de la liste !)
router.get("/lists/:id/cards", validateId, listController.getAllCardsByListId);

export default router;
