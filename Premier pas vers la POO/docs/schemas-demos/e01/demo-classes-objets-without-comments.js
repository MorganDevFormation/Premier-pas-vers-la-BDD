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

    #name;
    #age;

    constructor(_name, _age) {
        console.log('Je suis le constructeur de la classe Person');

        this.#name = _name;

        this.#setAge(_age);
    }

    speak() {
        console.log(`Hi! My name is ${this.#name} I'm ${this.#age} years old`);
    }

    #setAge(newValue) {
        if(newValue > 0 && newValue < 120) {
            this.#age = newValue;
        } else {
            console.log(`La nouvelle valeur pour l'age est incorrecte : ${newValue}`);
        }
    }

    birhtday() {
        this.#setAge(this.#age + 1);
    }
}

const myTiti = new Person('Titi', 42);
// console.log( `Name of myTiti : ${myTiti.name}` );
// console.log( `Age of myTiti : ${myTiti.age}` );

myTiti.speak();

const myToto = new Person('Toto', 8);
myToto.speak();

const josiane = new Person('Josiane', -10);
josiane.speak();

// josiane.#age = 46; // ERROR #age est PRIVE
// josiane.#setAge(56); // EOOR la méthode est privée
josiane.speak();

// josiane.#age = -10; // ERROR #age est PRIVE !
// josiane.#setAge(-10); // EOOR la méthode est privée
josiane.birhtday();
josiane.speak();

// josiane.#setAge(8); // EOOR la méthode est privée

// Test methode birthday()
// for (let i = 0; i < 130; i++) {
//     josiane.birhtday();
// }

