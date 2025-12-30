import httpError from '../utils/httpError.js';

class BaseController {


    #model              // a utiliser pour interroger la BDD
    #modelName               // String qui contient le petit modèle

    constructor(model, modelName) {

        this.#model = model
        this.#modelName = modelName
    }

    
    getAll = async (req, res, next) => {

        try {

            console.log('Appel de la méthode getAll')

            // SELECT
            const results = await this.#model.findAll();

            // renvoi la réponse code 200 avec tous les résultats de la requête SQL au format JSON
            res.status(200).json(results)

        } catch (error) {

            next(error)
        }

    }

    getById = async (req, res, next) => {

        try {

            console.log('ici getById dans BaseController')      // permet de valider si le chemin fonctionne

            const id = req.params.id // récupère l'id dans l'url

            const list = await this.#model.findByPk(id); // Recherche la liste correspondante à l'id dans la BDD

            if (! list) {           // on entre dans le if si la liste existe pas

                console.log(`ERROR ${this.#modelName} !!!`)

                const errorListNotFound = new httpError(`${this.#modelName} Not Found`, 404)       // on créer un nouvel objet error

                throw errorListNotFound         // on lance l'erreur 
            }


            res.status(200).json(list)

        } catch (error) {                           // catch veut dire attrapper
                                                    // error (objet JS) est une instance de la classe Error de JS
            console.log("J'ai attrapé une erreur")
            console.log(error)

            //res.status(404).json({error: error.message})

            next(error)     // appel le middleware de gestion d'erreurs car on a mis "error" en argument de "next"
        }
    }

    deleteById = async (req, res, next) => {

        try {

            console.log('ici deleteById dans BaseController')

            const id = req.params.id

            const results = await this.#model.destroy({where: {id}})       // supprime la list selon son id

            if (0 === results) {
                
                console.log(`ERROR ${this.#modelName} !!!`)

                const errorListNotFound = new httpError(`${this.#modelName} Not Deleted`, 404)       // on créer un nouvel objet error

                throw errorListNotFound         // on lance l'erreur 
            }

            //res.status(204).end()

        } catch (error) {

            next(error)
        }
    }

    updateById = async (req, res, next) => {

        try {

            console.log('hello ici updateByID dans Basecontroller')

            const listJson = req.body   // pour récupérer le JSON qui est dans le body de la requête

            const id = req.params.id    // récupère l'id dans l'url

            console.log(listJson)   // verif pour voir si on récupère bien ce qu'on a demandé
            console.log(`id = ${id}`)

            const results = await this.#model.update(listJson,
                {
                    where: {id},
                    returning: true   // retourne bien un deuxième tableau (voir doc sequelize)
                })

            if (0 === results[0]) {     // results[0] : nbr de liste modifiée
                                        // si aucune liste modifiée, on envoie un 404
                
                console.log(`ERROR ${this.#modelName} !!!`)

                const errorListNotFound = new httpError(`${this.#modelName} Not Modified`, 404)       // on créer un nouvel objet error

                throw errorListNotFound         // on lance l'erreur 
            }

            // console.log(results[1])     // Afficher ce qu'il y a dans le 2e Tableau

            //console.log(results[1][0].toJSON())     // pour afficher le détail de notre objet en dehors du tableau

            // console.log(results)    // verif si on récupère bien les modifs

            //res.status(200).json(results[1][0].toJSON())   // on envoie dans la réponse l'objet avec les nvelles valeurs

        } catch (error) {

            next(error)
        }
    }

    create = async (req, res, next) => {

        try {

            console.log('ici create dans BaseController')

            const listJson = req.body       // pour récupérer le JSON qui est dans le body de la requête

            console.log(listJson)       // verif pour voir si on récupère bien ce qu'on a demandé

            const newList = await this.#model.create(listJson)     // inserer une nouvelle liste dans la BDD

            console.log(newList.toJSON())

            res.status(201).json(newList)

            // pour les tags

            const newTag = await this.#model.create(req.body)
            res.status(201).json(newTag)

        } catch (error) {

            next(error)
        }
    }

}

export default BaseController