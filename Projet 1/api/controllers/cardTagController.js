import { Card, Tag } from '../models/index.js';

import httpError from '../utils/httpError.js';


// Controleur pour gérer les tags d'une card.


class cardTagController {


// Ajoute un tag existant dans la BDD dans la liste d'une carte existante dans la BDD

    addTag = async (req, res, next) => {

        const { cardId } = req.params

        try {

            const card = await Card.findByPk(cardId, {

                include: [
                    {
                        model: Tag,
                        as: 'tags',
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            if (!card) {

                throw new httpError(`Card ${cardId} Not Found`, 404)
            }

            const tag = await Tag.findByPk(req.body.id)

            if (!tag) {

                throw new httpError(`Tag ${req.body.id} Not Found`, 404)
            }

            await card.addTag(req.body.id)      // Ajout du tag dans la liste de la carte

            await card.reload({

                include: [
                    {
                        model: Tag,
                        as: 'tags',
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            res.status(200).json(card)

        } catch (error) {

            next(error)
        }
    }

// Change la liste de TOUS les tags d'une carte


    updateTagList = async (req, res, next) => {

        const { cardId } = req.params

        try {
            
            let card = await Card.findByPk(cardId,           // Recherche de la card avec sa liste de tags à partir de :id dans l'URL
                {
                include: [
                    {
                    model: Tag,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                    }
                ]
                }
            )
            if (!card) {
            
                throw new httpError(`Card ${cardId} Not Found`, 404);           // La carte n'existe pas => lance une nouvelle erreur
            }

            // Vérifier que tous les id des tags existent dans la BDD
            // objet tag
            let tag = {};

            for (let id of req.body.ids) {               // Parcours la liste des id fournis dans le body de la requete
                
                tag = await Tag.findByPk(id);           // Recherche d'un tag selon son id
                if (!tag) {
                
                throw new httpError(`Tag ${id} Not Found`, 404);        // le tag n'existe pas dans la BDD => lance une nouvelle erreur

                }
            }


            // Pas d'erreur => tous les tags existent bien dans la BDD

            await card.setTags(req.body.ids)         // Modifie la liste des tags de la carte

            
            await card.reload(          // "Refresh" de card pour récupérer la carte avec tous ses tags 
                {
                include: [
                    {
                    model: Tag,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                    }
                ]
                }
            );

            res.status(200).json(card);     // Envois la réponse 200 avec la carte et sa liste de tag mise à jour    
            

            } catch (error) {
            
            next(error);        // ajoute la clé status code 500

            }
        }

// Supprime un tag d'une carte

    deleteTag = async (req, res, next) => {

        //const { cardId } = req.params

        try {

            
            let card = await Card.findByPk(req.params.idCard,       // Recherche de la card avec sa liste de tags à partir de :idCard dans l'URL
                {
                include: [
                    {
                    model: Tag,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                    }
                ]
                }
            )

            if (!card) {

                throw new httpError(`Card ${req.params.idCard} Not Found`, 404);         // La card n'existe pas => lance une nouvelle erreur

            }

            
            const tag = await Tag.findByPk(req.params.idTag);       // Recherche le tag dans la BDD à partir de :idTag dans l'URL

            if (!tag) {
                
                throw new httpError(`Tag ${req.params.idTag} Not Found`, 404);      // Le tag n'existe pas => lance une nouvelle erreur

            }

            
            await card.removeTag(req.params.idTag)          // Supprime le tag de la liste de la carte

            
            await card.reload(          // "Refresh" de card pour récupérer la carte avec tous ses tags 
                {
                include: [
                    {
                    model: Tag,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                    }
                ]
                }
            );

            
            res.status(200).json(card.toJSON());        // Renvois 200 au client avec dans le body la carte et tous ses tags

            } catch (error) {

            next(error);

            }
        }
}

const myController = new cardTagController();
export default myController;
