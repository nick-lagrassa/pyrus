import settings from '../../config/settings';
import { pop, initializeDeck, shuffleDeck } from '../../actions/deck';

class Deck {
    // List[Card] -> Deck
    constructor(cards, store) {
        this._cardsDrawnPerTurn = settings.NUM_CARDS_DRAWN_PER_TURN;
        this._store = store;
        this._store.dispatch(initializeDeck(cards));
        this.shuffle();
    }

    get cards() {
        return this._store.getState().deck.cards;
    }

    get discard() {
        return this._store.getState().deck.discard;
    }

    // Draw n cards from the top of the deck. Default to the number of cards
    // drawn at the end of the turn
    // int -> List[Card]
    draw(n=this._cardsDrawnPerTurn) {
        let drawnCards = [];

        if (this.isEmpty) {
            return drawnCards;
        }

        for (let i = 0; i < n; i++) {
            if (this.isEmpty) {
                this._store.dispatch(pop(n));
                return drawnCards.slice();
            }

            drawnCards.push(this.cards[i]);
        }
        this._store.dispatch(pop(n));
        return drawnCards.slice();
    }

    shuffle() {
        // this._store.dispatch(shuffleDeck());
    }

    // -> boolean
    get isEmpty() {
        return this.cards.length <= 0;
    }
}

export default Deck;
