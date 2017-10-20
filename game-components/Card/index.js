class Card {
    // A card takes the type of card, the allowed implementation, and example uses
    // String, String, String -> Card
    constructor(type, implementation, example) {
        this.type = type;
        this.implementation = implementation;
        this.example = example;
    }
}

export default Card;
