import { Router } from "express";

// import d'une instance de ProductController
import listController from "../controllers/list.controller.js"; 

import { validateId } from '../middlewares/common.middleware.js';
import { validateListCreate, validateListUpdate } from '../middlewares/list.middleware.js';

import { isAllowed } from '../middlewares/auth.middleware.js'

const router = Router();

// requete HTTP GET
router.get("/lists/", isAllowed('user'), listController.getAll);
// requete HTTP GET
router.get("/lists/:id", isAllowed('user'), validateId, listController.getById);
// requete HTTP DELETE
router.delete("/lists/:id", isAllowed('admin'), validateId, listController.delete);
// requete HTTP POST
router.post("/lists", isAllowed('admin'), validateListCreate, listController.create);
// requete HTTP PATCH
router.patch("/lists/:id", isAllowed('admin'), validateId, validateListUpdate, listController.update);

// requete HTTP GET uniquement les cartes d'une liste (sans les informations de la liste !)
router.get("/lists/:id/cards", isAllowed('admin'), validateId, listController.getAllCardsByListId);

export default router;
