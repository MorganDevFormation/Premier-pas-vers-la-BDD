import Joi from 'joi';

export function validateTagCreate(req, res, next) {

    const createTagSchema = Joi.object({
        name: Joi.string().required(),
        color: Joi.string().required(),
        //list_id: Joi.number().positive().required()
    })

    const validation = createTagSchema.validate(req.body)

    if (validation.error) {     // error le JSON de la réponse n'est pas valide !

        res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

        return;     // Fin du traitement de la requête
    }

    next()      // pas entré dans le If, le body est valide donc on passe au middleware suivant

}

export function validateTagUpdate(req, res, next) {

        const createTagSchema = Joi.object({

            name: Joi.string(),
            color: Joi.string(),
            //list_id: Joi.number().positive()
        })

        const validation = createTagSchema.validate(req.body)


        if (validation.error) {     // error le JSON de la réponse n'est pas valide !

            res.status(400).json({ error: validation.error })   // envoi directement une réponse au client sans passer au middleware suivant

            return;     // Fin du traitement de la requête
        }

        next()

}