import Deck from '../Deck';
import DiscardPile from '../DiscardPile';
import Editor from '../Editor';

class Board {
    // Prompt -> Board
    constructor(prompt, store) {
        this._prompt = prompt;
        this._store = store;
        this._editor = new Editor();
        this._deck = new Deck(this._prompt.cardSet, this._store);
        this._discardPile = new DiscardPile();
    }

    get deck() {
        return this._store.getState().deck;
    }

    get players() {
        return this._store.getState().players;
    }

    get prompt() {
        return this._prompt;
    }

    // Given id return player object
    // int -> Object
    getPlayerById(id) {
        return this.players.filter(player => player.id === id)[0] || null;
    }

    set editor(code) {
        this._editor = code;
    }
}

export default Board;
