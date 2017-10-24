import settings from '../../config/settings';
import shuffle from 'fisher-yates-shuffle';

class Deck {
    // List[Card] -> Deck
    constructor(cards) {
        this._cardsDrawnPerTurn = settings.NUM_CARDS_DRAWN_PER_TURN;
        this._cards = shuffle(cards);
    }

    shuffle() {
        this._cards = shuffle(this._cards);
    }

    // Draw n cards from the top of the deck. Default to the number of cards
    // drawn at the end of the turn
    // int -> List[Card]
    draw(n=this._cardsDrawnPerTurn) {
        if (this.isEmpty) {
            // trigger lose condition
        }

        let drawnCards = [];
        for (let i = 0; i < n; i++) {
            if (this.isEmpty) {
                return drawnCards;
            }

            drawnCards.push(this._cards.pop());
        }
        return drawnCards;
    }

    // -> boolean
    get isEmpty() {
        return this._cards.length === 0;
    }
}

export default Deck;
