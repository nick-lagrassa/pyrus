import Card from '../Card';
import Deck from '../Deck';
import DiscardPile from '../DiscardPile';
import Prompt from '../Prompt';
import Editor from '../Editor';
import Player from '../Player';

import shuffle from 'fisher-yates-shuffle';

class Board {
    // Prompt -> Board
    constructor(prompt) {
        this._prompt = prompt;
        this._deck = this.initializeDeck();
        // Deck
        // Card
        // DiscardPile
        // Editor
        // Prompt
        // Player
    }

    get deck() {
        return this._deck;
    }

    // -> Deck
    initializeDeck() {
        return new Deck(shuffle(this._prompt.cardSet));
    }
}

export default Board;
