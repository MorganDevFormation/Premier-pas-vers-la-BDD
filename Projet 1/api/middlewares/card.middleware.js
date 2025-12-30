import Joi from 'joi';

export function validateCardCreate(req, res, next) {

    const createCardSchema = Joi.object({
        content: Joi.string().required(),
        position: Joi.number().positive().required(),
        color: Joi.string().required(),
        list_id: Joi.number().positive().required()
    })

    const validation = createCardSchema.validate(req.body)

    if (validation.error) {     // error le JSON de la réponse n'est pas valide !

        res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

        return;     // Fin du traitement de la requête
    }

    next()      // pas entré dans le If, le body est valide donc on passe au middleware suivant

}

export function validateCardUpdate(req, res, next) {

        const createCardSchema = Joi.object({

            content: Joi.string(),
            position: Joi.number().positive(),
            color: Joi.string(),
            list_id: Joi.number().positive()
        })

        const validation = createCardSchema.validate(req.body)


        if (validation.error) {     // error le JSON de la réponse n'est pas valide !

            res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

            return;     // Fin du traitement de la requête
        }

        next()

}