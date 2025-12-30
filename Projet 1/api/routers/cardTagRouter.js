import { Router } from 'express';

import cardTagController from '../controllers/cardTagController.js';

import { validateId } from '../middlewares/common.middleware.js'
import { validateIdCardAndIdTag, validateCardTagId, validateCardTagList } from '../middlewares/cardTag.middleware.js';

const cardTagRouter = Router()

// Ajouter un tag existant dans la liste d'une carte existant
cardTagRouter.post('/cards/:id/tags', validateId, validateCardTagId, cardTagController.addTag);

// Modifier la liste de tous les tag d'un carte
cardTagRouter.put('/cards/:id/tags', validateId, validateCardTagList, cardTagController.updateTagList);

// Supprimer un tag d'une carte
cardTagRouter.delete('/cards/:idCard/tags/:idTag', validateId, validateIdCardAndIdTag, cardTagController.deleteTag);

export { cardTagRouter }