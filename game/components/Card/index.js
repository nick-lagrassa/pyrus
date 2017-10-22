class Card {
    constructor() {
        if (new.target === Card) {
            throw new TypeError("Card is an abstract class.");
        }
    }

    // Get the type of this card
    // -> String
    get type() {
        return this._type;
    }

    // Get an example of how the object on this card can be implemented
    // -> String
    get implementation() {
        return this._implementation;
    }

    // Get an example of the API for the object on the card
    // -> String
    get example() {
        return this._example;
    }
}

export default Card;
