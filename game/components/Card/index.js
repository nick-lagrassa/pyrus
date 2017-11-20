class Card {
    constructor() {
        if (new.target === Card) {
            throw new TypeError("Card is an abstract class.");
        }
    }

    isInstanceOf(code) {
        throw new Error("isInstanceOf is an abstract method");
    }
}

export default Card;
