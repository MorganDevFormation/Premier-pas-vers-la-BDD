import { Router } from "express";

// import mainController from "./controllers/main-controller.js";

// import d'une instance de ProductController
import productController from "./controllers/ProductController.js"; 

const router = Router();

router.get("/", productController.renderHomePage);
router.get("/catalog", productController.renderCatalogPage);
router.get("/article/:id", productController.renderCoffeeDetailsPage);

export default router;
