import { Router } from 'express';
import listController from '../controllers/listController.js';

import { validateId } from '../middlewares/common.middleware.js';
import { validateListCreate, validateListUpdate } from '../middlewares/list.middleware.js';

const router = Router();

    // REQUETE HTTP GET
    router.get('/lists',listController.getAll)

    router.get('/lists/:id', validateId, listController.getById)

    // REQUETE HTPP DELETE
    router.delete('/lists/:id', validateId, listController.deleteById)

    // REQUETE HTTP PATCH
    router.patch('/lists/:id', validateId, validateListUpdate, listController.updateById)
    
    // REQUETE HTPP POST
    router.post('/lists', validateListCreate, listController.create)

export { router }