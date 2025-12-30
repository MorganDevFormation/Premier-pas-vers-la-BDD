class httpError extends Error {     //class httpError (perso) qui hérite de la class Error de JS

    
    #name

    #statusCode     // contient un code d'erreur

    constructor(message, code) {

        super(message)      // super appel le constructor de la class parente

        this.#name = 'htppError'       // bonne pratique: ajouter un attribut "name" qui indique le nom de la class d'erreur

        this.#statusCode = code        // appel la setter de status code
    }


    get name() {
        return this.#name
    }
    get statusCode() {
        return this.#statusCode
    }

    set statusCode(value) {
        this.#statusCode = value
    }
}

export default httpError