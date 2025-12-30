class Person {

    #id;
    #name;

    constructor(_id, _name) {
        this.#id = _id;
        this.#name = _name;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set id(value) {
        this.#id = value;
    }

    set name(value) {
        this.#name = value;
    }

    sayHello() {
        console.log(`Salut, je m'appelle ${this.#name}`);
    }
}

// Nouveau mot clé "extends" : pour faire de l'héritage
// La classe Etudiant hérite de la classe Person
// La classe Etudiant possède maintenant TOUS ce qui est PUBLIQUE dans la classe Person
class Etudiant extends Person {

    // id et name sont maintenant dans la classe Person
    // #id;
    // #name;
    #num_etudiant;

    constructor(_id, _name, _num) {
        // this.#id = _id;
        // this.#name = _name;

        // Puisque la classe Etudiant hérite de la classe Person
        // Je vais appeler le constructeur de la classe Person
        // Nouveau mot clé : super( avec les arguements demandés par le constructeur de la classe parente)
        // le mot clé super est un alias vers le constructeur de la classe parente
        // TOUJOURS dans le constructeur d'une classe fille (enfant) : première instruction super() !
        super(_id, _name);

        this.#num_etudiant = _num;
    }


    get num_etudiant() {
        return this.#num_etudiant;
    }

    set num_etudiant(value) {
        this.#num_etudiant = value;
    }

    // sayHello est déclaré dans la classe Person, j'ai pas besoin de la réécrire
    // sayHello() {
    //     console.log(`Salut, je m'appelle ${this.#name}`);
    // }
}

const josiane = new Person(1, 'Josiane');
josiane.sayHello();
console.log(`ID de ${josiane.name} ${josiane.id}`);

const toto = new Etudiant(42, 'Toto', 123456);
toto.sayHello();
console.log(`ID de ${toto.name} ${toto.id}`);
console.log(`Numero etudiant de ${toto.name} ${toto.num_etudiant}`);
