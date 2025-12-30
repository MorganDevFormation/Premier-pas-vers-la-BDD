import { Router } from "express";

// import d'une instance de ProductController
import cardController from "../controllers/card.controller.js"; 

import { validateId } from '../middlewares/common.middleware.js';

// TODO ajouter card middleware
import { validateCardCreate, validateCardUpdate } from '../middlewares/card.middleware.js';

const router = Router();

// requete HTTP GET
router.get("/cards/", cardController.getAll);

// requete HTTP GET
router.get("/cards/:id", validateId, cardController.getById);

// requete HTTP POST
router.post("/cards", validateCardCreate, cardController.create);

// requete HTTP PATCH
router.patch("/cards/:id", validateId, validateCardUpdate, cardController.update);

// requete HTTP DELETE
router.delete("/cards/:id", validateId, cardController.delete);


export default router;
