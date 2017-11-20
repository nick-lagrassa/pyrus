import Deck from '../Deck';

class Board {
    // Prompt -> Board
    constructor(prompt, store) {
        this._prompt = prompt;
        this._store = store;
        this._editor = '';
        this._deck = new Deck(this._prompt.cardSet, this._store);
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

    get editor() {
        return this._store.getState().board.editor;
    }

    // Given id return player object
    // int -> Object
    getPlayerById(id) {
        return this.players.filter(player => player.id === id)[0] || null;
    }
}

export default Board;
