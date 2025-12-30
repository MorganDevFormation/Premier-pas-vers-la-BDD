import { Router } from "express";
import tagController from '../controllers/tagController.js';

import { validateId } from "../middlewares/common.middleware.js";
import { validateTagCreate, validateTagUpdate } from "../middlewares/tag.middleware.js";

const TagRouter = Router()

    // REQUETE HTTP GET
    TagRouter.get('/tags',tagController.getAll)

    TagRouter.get('/tags/:id', validateId, tagController.getById)

    // REQUETE HTPP POST
    TagRouter.post('/tags', validateTagCreate, tagController.create)

    // REQUETE HTTP PATCH
    TagRouter.patch('/tags/:id', validateId, validateTagUpdate, tagController.updateById)

    // REQUETE HTPP DELETE
    TagRouter.delete('/tags/:id', validateId, tagController.deleteById)


export { TagRouter } 