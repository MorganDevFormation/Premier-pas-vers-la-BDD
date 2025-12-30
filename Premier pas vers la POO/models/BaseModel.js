class BaseModel {

    #id;

    constructor(_id) {
        this.#id = _id;
    }

    get id() {
        return this.#id;
    }

    // On pourrait ne pas mettre de setter
    // De manière à empécher la modification de l'ID depuis l'extérieur de la classe
    set id(value) {
        this.#id = value;
    }
}

export default BaseModel;
