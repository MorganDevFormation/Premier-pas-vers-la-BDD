// objet titi
const titi = {
    //clé name avec valeur string "Titi"
    name: 'Titi',
    // clé age avec valeur 42
    age: 42,

    // clé speak, avec comme valeur une fonction
    speak: function() {
        // ici this remplace "titi"
        // on peut considérer this comme un alias "générique" qui désigne l'objet courant 
        console.log(`Hi! My name is ${this.name} I'm ${this.age} years old`);
    }
}

// objet qui s'appelle toto
const toto = {
    // clé "name" qui prend la valeur string "toto"
    name: 'Toto',
    // clé age qui prendre la valeur int 8
    age: 8,

    // clé speak, avec comme valeur une fonction
    speak: function() {
        // ici this remplace "toto"
        // on peut considérer this comme un alias "générique" qui désigne l'objet courant 
        console.log(`Hi! My name is ${this.name} I'm ${this.age} years old`);
    }
}

// appel de la fonction speak() de mon objet titi 
// titi.speak();
// appel de la fonction speak de mon objet toto
// toto.speak();


// ===========
// ** Ma première classe : le schéma de construction d'une Person **
// ===========
class Person {

    // Organisation d'une classe
    // 1 : les attributs (les clés des objets)
    // 2 : le constructor
    // 3 : d'autres fonctions

    // Un attribut name qui sera présent dans TOUS mes objets
    // équivalent de la clé "name" vue plus haut
    // Je choisi que name va être un attribut *privé*
    // ajouter # devant le nom de l'attribut
    #name;
    // Un attribut age ==> tous mes objets vont avoir cet attribut
    // Avec un # devant le nom, l'attribut devient privé !
    #age;

    // Fonction spéciale avec le mot clé "constructor"
    // Cette fonction est appellée systématiquement lors de la création des nouveaux objets
    // Constructeur (fonction constructor) avec 2 paramètres : _name et _age
    constructor(_name, _age) {
        console.log('Je suis le constructeur de la classe Person');

        // Initialise l'attribut "name" avec la valeur passée en paramètre _name
        // Enregistre la valeur dans l'attribut this.name
        this.#name = _name;

        // Initialise l'attribut "age" avec la valeur passée ne paramètre _age
        // Appel le setter prive pour s'assurer que la valeur de l'age n'est pas en dehors des limites
        this.#setAge(_age);
    }

    // Getter pour renvoyer la valeur du nom #name
    get name() {
        // Renvoie une copie de la valeur de this.#name
        return this.#name;
    }

    // Retourne la valeur de l'age de la Person
    get age() {
        return this.#age;
    }

    // D'autres fonctions comme speak() par exemple

    // méthode speak() pour faire parler les Person
    speak() {
        // on peut considérer this comme un alias "générique" qui désigne l'objet courant 
        console.log(`Hi! My name is ${this.#name} I'm ${this.#age} years old`);
    }

    // méthode setter pour modifier l'age
    // Avec un # je rend cette fonction privée !
    #setAge(newValue) {
        // controle de la nouvelle valeur
        // si la nouvelle valeur proposée est incorecte
        // ne pas modifier
        if(newValue > 0 && newValue < 120) {
            // newValue est suppérieur à 0 et inférieur à 120
            // Ok je prend la nouvelle valeur
            this.#age = newValue;
        } else {
            console.log(`La nouvelle valeur pour l'age est incorrecte : ${newValue}`);
        }
    }

    // Une autre manière d'écire un setter, cette fois pour l'age
    // écriture : mot clé "set", puis un espace, puis le nom de l'attribut sans le #
    // Avec cette notation, on ne peut pas rendre la méthode privée !
    // Cette notation est obligatoirement PUBLIC !
    // On l'appel avec la notation "classique" : <mon_objet>.name = "nouvelle valeur";
    set name(newValue) {
        // To Do : vérifier que newValue n'est pas un string vide
        // Si newValue est vide, je ne modie pas this.#name
        this.#name = newValue;
    }

    // Méthode public birthday
    // Pour incrémenter de 1 l'age de la Personne
    birhtday() {
        // Appel la méthode privee #setAge depuis l'intérieur de ma classe 
        this.#setAge(this.#age + 1);
    }
}

// Un nouvel objet de la classe Person
// Ici je vais créer une nouvelle instance de la classe Person
// nouveau mot clé "new"
// new Person() ==> appel le constructeur de la classe Person
// La valeurs passées entre parenthèses sont données à la fonction constructeur
const myTiti = new Person('Titi', 42);
// console.log( `Name of myTiti : ${myTiti.name}` );
// console.log( `Age of myTiti : ${myTiti.age}` );

// Appeler la fonction speak() qui est mon objet myTiti
myTiti.speak();

// Faire un nouvel objet myToto de la classe Person avec name Toto et age 8 ?
const myToto = new Person('Toto', 8);
myToto.speak();

// Appel du contructeur pour créer un nouvel objet "josiane"
const josiane = new Person('Josiane', -10);
josiane.speak();

// Je change la valeur de l'attribut age pour l'objet josiane
// name est maintenant un attribut privé : #name
// je ne peux pas modifier sa valeur en dehors de la classe Person
// josiane.#age = 46; // ERROR #age est PRIVE
// josiane.#setAge(56); // EOOR la méthode est privée
josiane.speak();

// Je change la valeur de l'attribut age pour l'objet josiane
// name est maintenant un attribut privé : #age
// je ne peux pas modifier sa valeur en dehors de la classe Person
// josiane.#age = -10; // ERROR #age est PRIVE !
// josiane.#setAge(-10); // EOOR la méthode est privée
josiane.birhtday();
josiane.speak();

// josiane.#setAge(8); // EOOR la méthode est privée

// Test methode birthday()
// for (let i = 0; i < 130; i++) {
//     josiane.birhtday();
// }


// Je modifier le nom de josiane
// appel le setter de l'attribut PRIVE #name
// josiane.#name = 'Josie'; // ERROR => j'assaie de modifier l'attribut PRIVE
josiane.name = 'Josie'; // OK => appel la méthode PUBLIC set name(newValue)
josiane.speak();


console.log(`Name: ${josiane.name}`); // appel le getter : get name()