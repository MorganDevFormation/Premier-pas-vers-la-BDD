// import CoreController from './CoreController.js';
import { Card, Tag } from '../models/index.js';

import HttpError from '../utils/HttpError.js';

// Controleur pour gérer les tags d'une card.
// Pas besoin d'hériter de BaseController
// Ce controleur effectue des opérations avancée de traitement des tags   
class CardTagController {


  // Ajoute un tag existant dans la BDD dans la liste d'une carte existante dans la BDD
  // l'id de la carte est dans l'URL => :id
  // l'id du tag est dans le body de la requête : { id : <id du tag> }
  addTag = async (req, res, next) => {

    try {

      // Recherche de la card avec sa liste de tags à partir de :id dans l'URL
      const card = await Card.findByPk(req.params.id,
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
        // card n'existe pas => lance une nouvelle erreur 404
        throw new HttpError(`Card ${req.params.id} Not Found`, 404);
      }

      // Recherche du tag à partir de la clé id dans le body de la request
      const tag = await Tag.findByPk(req.body.id);
      if (!tag) {
        // tag n'existe pas => lance une nouvelle erreur
        throw new HttpError(`Tag ${req.body.id} Not Found`, 404);
      }

      // Ajout du tag dans la liste de la carte
      // addTag => méthode magique de Sequelize ajoutée quand on a fait l'association Card <-> Tag dans models/index.js
      // addTag retourne la table pivot 
      await card.addTag(req.body.id);

      // "Refresh" de card pour récupérer la carte avec tous ses tags 
      await card.reload(
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

      // Renvois 200 au client avec dans le body la carte avec tous les tags
      res.status(200).json(card);

    } catch (error) {
      next(error);
    }
  }

  // Change la liste de TOUS les tags d'une carte
  // L'id de la carte est dans l'URL => :id
  // les id des tags à ajouter dans la carte sont le body de la requetes : { ids : [ tableau des ids des tags ] }
  updateTagList = async (req, res, next) => {

    try {
      // Recherche de la card avec sa liste de tags à partir de :id dans l'URL
      let card = await Card.findByPk(req.params.id,
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
        // La carte n'existe pas => lance une nouvelle erreur
        throw new HttpError(`Card ${req.params.id} Not Found`, 404);
      }

      // Vérifier que tous les id des tags existent dans la BDD
      // objet tag
      let tag = {};
      // Parcours la liste des id fournis dans le body de la requete
      for (let id of req.body.ids) {
        // Recherche d'un tag selon son id
        tag = await Tag.findByPk(id);
        if (!tag) {
          // le tag n'existe pas dans la BDD => lance une nouvelle erreur
          throw new HttpError(`Tag ${id} Not Found`, 404);
        }
      }


      // Pas d'erreur => tous les tags existent bien dans la BDD
      // Modifie la liste des tags de la carte
      await card.setTags(req.body.ids)

      // "Refresh" de card pour récupérer la carte avec tous ses tags 
      await card.reload(
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

      // Envois la réponse 200 avec la carte et sa liste de tag mise à jour
      res.status(200).json(card);

    } catch (error) {
      // ajoute la clé status code 500
      next(error);
    }
  }




  // Supprime un tag d'une carte
  // l'id de la carte est dans l'URL de la requete => :idCard
  // l'id du tag à enlever de la carte est dans l'URL de la requete => :idTag
  // Exemple : DELETE : http://localhost:3000/cards/1/tags/1 => supprime le tag 1 de la carte 1
  // La fonction ne supprime pas le tag de la BDD !
  // La fonction supprime le tag de la table pivot => elle retire le tag d'une carte 
  deleteTag = async (req, res, next) => {
    try {

      // Recherche de la card avec sa liste de tags à partir de :idCard dans l'URL
      let card = await Card.findByPk(req.params.idCard,
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
        // La card n'existe pas => lance une nouvelle erreur
        throw new HttpError(`Card ${req.params.idCard} Not Found`, 404);
      }

      // Recherche le tag dans la BDD à partir de :idTag dans l'URL
      const tag = await Tag.findByPk(req.params.idTag);
      if (!tag) {
        // Le tag n'existe pas => lance une nouvelle erreur
        throw new HttpError(`Tag ${req.params.idTag} Not Found`, 404);
      }

      // Supprime le tag de la liste de la carte
      await card.removeTag(req.params.idTag)

      // "Refresh" de card pour récupérer la carte avec tous ses tags 
      await card.reload(
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

      // Renvois 200 au client avec dans le body la carte et tous ses tags
      res.status(200).json(card.toJSON());

    } catch (error) {
      next(error);
    }
  }
}

const myController = new CardTagController();
export default myController;
