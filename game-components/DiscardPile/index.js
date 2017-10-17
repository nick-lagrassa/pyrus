class DiscardPile {
    // The DiscardPile class maintains the cards discarded during the game
    // -> DiscardPile
    constructor() {
        this.cards = [];
    }

    // add a card to List[Card] attribute
    // Card ->
    set addCard(card) {
        this.cards.push(card);
    }
}

export default DiscardPile;
