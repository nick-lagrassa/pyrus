class Card {
    constructor() {
        if (new.target === Card) {
            throw new TypeError("Card is an abstract class.");
        }
    }

    isInstanceOf(code) {
		throw new TypeError("instance of is an abstract class");
    }
}

export default Card;
