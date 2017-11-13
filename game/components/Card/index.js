class Card {
    constructor() {
        if (new.target === Card) {
            throw new TypeError("Card is an abstract class.");
        }
    }
}

export default Card;
