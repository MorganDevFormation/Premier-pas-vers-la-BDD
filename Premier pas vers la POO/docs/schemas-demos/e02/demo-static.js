class Person {

    #name;
    #age;

    constructor(_name, _age) {
        console.log('Je suis le constructeur de la classe Person');

        this.#name = _name;

        this.#setAge(_age);
    }

    get name() {
        return this.#name;
    }

    get age() {
        return this.#age;
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

    set name(newValue) {
        this.#name = newValue;
    }

    birhtday() {
        this.#setAge(this.#age + 1);

        // Je peux appeler la méthode privée static #sayHello()
        // uniquement depuis l'intérieur de la classe Person, car elle est privée 
        Person.#sayHello();

        this.sayHello();
    }

    static #sayHello() {
        console.log('Hello from static method');
    }
}

// random() est une fonction, indice : les () qui permettent de passe des arguments à la fonction
// Math est le nom d'une classe : indice, ça commencer par une majuscule
// Pas besoin de passer par un objet instance de la classe Math pour appeler la méthode random()
const number = Math.random();
console.log(`Nombre aléatoire : ${number}`);


// Pas besoin de créer un objet Person pour apeller la méthode static sayHello()
Person.sayHello(); // Affiche : Hello from static method
