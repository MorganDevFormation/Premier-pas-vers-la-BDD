// middleware de vérification de l'Id ( savoir si c'est bien un entier dans l'URL )

export function validateId(req, res, next) {        // permet de pouvoir importer notre fonction là où on en a besoin

    const id = Number(req.params.id)       // récupérer l'id dans l'URL

    // vérification si l'Id est bien un entier

    if(Number.isInteger(id) && id > 0) {    // on dit que Id est un entier et qu'il est supérieur à 0
        
        return next()   // on appel le middleware suivant avec next()
                        // on stoppe l'éxécution de la function avec return
    }

    res.status(400).json({error: 'Id Invalid'});  // on envoie une réponse au client sans passer au middleware suivant

}

// middleware qui attrape et gère toutes les erreurs

// dans Express, les middlewares avec 4 arguments sont dédiés à la gestion d'erreurs

// Ce middleware est directement appelé par express quand on fait un "next" avec un argument erreur exemple : next(error)
// ici l'agrument " err ": on attends soit une instance de la class Error soit de la class httpError

export function errorHandler(err, req, res, next) {

    const statusCode = err.statusCode || 500        // on copie la valeur de statusCode de la class httpError
                                                    // 500 => si il n'ya rien dans err.statusCode alors prend la valeur 500

                                                        // Alternative
                                                        /* let statusCode = 500
                                                            if (err.statusCode) {
                                                                statusCode = err.statusCode
                                                            }
                                                        */
    const errorMessage = err.message || ' Erreur interne du serveur'     // ici message prend la valeur de err.message OU (||) la string par défaut 'Erreur interne du serveur' si err.message est null

    res.status(statusCode).json({           // envoie une réponse http "error" au client

        status: " error ",
        code: statusCode,
        message: errorMessage

    })
}