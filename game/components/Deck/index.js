import settings from '../../config/settings';
import { pop } from '../../actions/deck';

class Deck {
    // List[Card] -> Deck
    constructor(cards, store) {
        this._cardsDrawnPerTurn = settings.NUM_CARDS_DRAWN_PER_TURN;
        this._store = store
    }

    get cards() {
        return this._store.deck.cards;
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

            drawnCards.push(this.cards[i]);
        }
        this._store.dispatch(pop(n));
        return drawnCards;
    }

    // Return n cards from the top of the deck *without* removing them from
    // the deck
    // int -> List[Card]
    peek(n=this._cardsDrawnPerTurn) {
        if (this.isEmpty) {
            // trigger lose condition
        }

        let peekedCards = [];
        for (let i = 0; i < n; i++) {
            if (this.isEmpty) {
                return peekedCards;
            }

            peekedCards.push(this._cards[i]);
        }
        return peekedCards;
    }

    // -> boolean
    get isEmpty() {
        return this._cards.length === 0;
    }
}

export default Deck;
