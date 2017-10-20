class Deck {
    // List[Card] -> Deck
    constructor(cards, cardsDrawnPerTurn) {
        this.cardsDrawnPerTurn = cardsDrawnPerTurn;
        this.cards = cards;
    }

    // Draw n cards from the top of the deck. Default to the number of cards
    // drawn at the end of the turn
    // int -> List[Card]
    draw(n=this.cardsDrawnPerTurn) {
        let drawnCards = [];
        for (let i = 0; i < n; i++) {
            if (this.empty) {
                return drawnCards;
            }

            drawnCards.push(this.cards.pop());
        }
        return drawnCards;
    }

    // -> boolean
    get empty() {
        return this.cards.length === 0;
    }
}

export default Deck;
