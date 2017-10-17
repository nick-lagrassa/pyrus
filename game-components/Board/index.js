import Card from '../Card';
import Deck from '../Deck';
import DiscardPile from '../DiscardPile';
import Prompt from '../Prompt';
import Editor from '../Editor';
import Player from '../Player';


class Board {
    constructor() {
        this.prompt = new Prompt();
        this.deck = initializeDeck();
        // Deck
        // Card
        // DiscardPile
        // Editor
        // Prompt
        // Player
    }

    randomizeDeck() {
        let cards = this.prompt.cardSet;
    }
    initializeDeck() {
        let initialCards = randomizeDeck();
        return Deck(initialCards);
    }
}

export default Board;
