import settings from '../../config/settings';
import { pop, initializeDeck } from '../../actions/deck';
import shuffleInplace from 'fisher-yates/inplace';

class Deck {
    // List[Card] -> Deck
    constructor(cards, store) {
        this._cardsDrawnPerTurn = settings.NUM_CARDS_DRAWN_PER_TURN;
        this._store = store;
        this._store.dispatch(initializeDeck(shuffleInplace(cards)));
    }

    get cards() {
        return this._store.getState().deck.cards;
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
                this._store.dispatch(pop(n));
                return drawnCards;
            }

            drawnCards.push(this.cards[i]);
        }
        this._store.dispatch(pop(n));
        return drawnCards;
    }

    // -> boolean
    get isEmpty() {
        return this.cards.length === 0;
    }
}

export default Deck;
