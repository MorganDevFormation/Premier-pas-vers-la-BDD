import { Router } from 'express';
import cardController from '../controllers/cardController.js';

import { validateId } from '../middlewares/common.middleware.js';
import { validateCardCreate, validateCardUpdate } from '../middlewares/card.middleware.js';

const CardRouter = Router()

    // REQUETE HTTP GET
    CardRouter.get('/cards',cardController.getAll)

    CardRouter.get('/cards/:id', validateId, cardController.getById)

    // REQUETE HTPP POST
    CardRouter.post('/cards', validateCardCreate, cardController.create)

    // REQUETE HTTP PATCH
    CardRouter.patch('/cards/:id', validateId, validateCardUpdate, cardController.updateById)

    // REQUETE HTPP DELETE
    CardRouter.delete('/cards/:id', validateId, cardController.deleteById)

export { CardRouter }