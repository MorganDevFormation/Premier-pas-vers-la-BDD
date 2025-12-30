import Joi from 'joi';

export function validateListCreate(req, res, next) {

    Joi.object({
        title: Joi.string().required(),
        position: Joi.number().positive().required()
    })

    const validation = createListSchema.validate(req.body)

    if (validation.error) {     // error le JSON de la réponse n'est pas valide !

        res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

        return;     // Fin du traitement de la requête
    }

    next()      // pas entré dans le If, le body est valide donc on passe au middleware suivant

}

export function validateListUpdate(req, res, next) {

        const createListSchema = Joi.object({

            title: Joi.string(),
            position: Joi.number().positive()

        })

        const validation = createListSchema.validate(req.body)


        if (validation.error) {     // error le JSON de la réponse n'est pas valide !

            res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

            return;     // Fin du traitement de la requête
        }

        next()

}