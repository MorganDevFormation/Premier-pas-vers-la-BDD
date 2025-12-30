import { Router } from "express";

// import d'une instance de ProductController
// productController est une instance de la classe ProductController 
// import TagController from "../controllers/Tag.controller.js";
import tagController from "../controllers/tag.controller.js";

// import middleware pour valider les données
import { validateId } from "../middlewares/common.middleware.js";
import { validateTagCreate, validateTagUpdate } from "../middlewares/tag.middleware.js";


const router = Router();


// Get tags 
// préfixe /tags et configuré dans app.js
router.get("/tags/", tagController.getAll);
router.get("/tags/:id", validateId, tagController.getById);

router.post("/tags/", validateTagCreate, tagController.create);

router.patch("/tags/:id", validateId, validateTagUpdate, tagController.update);
// router.put("/tags/:id", TagController.update);

router.delete("/tags/:id", validateId, tagController.delete);


export default router;
