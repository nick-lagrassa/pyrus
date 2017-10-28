import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import settings from '../../config/settings';
import { gameStart } from '../../actions/game';
import { registerPlayer, setPlayerHand } from '../../actions/players';
import { GAME_STATUS_INIT, GAME_STATUS_RUNNING } from '../../constants/game';

class Game {
    // Prompt, Store -> Game
    constructor(prompt, store) {
        this._store = store;
        this._re = new RulesEnforcer(store);
        this._me = new MoveExecutor(store);
        this._board = new Board(prompt, store);
    }

    get status() {
        return this._store.getState().game.status;
    }

    get activePlayerIndex() {
        return this._store.getState().game.activePlayerIndex;
    }

    // String -> bool
    registerPlayer(name) {
        if (this.status !== GAME_STATUS_INIT) {
            return false;
        }

        if (this._board.players.length < settings.MAX_PLAYERS_PER_GAME) {
            // eventually, we won't be able to use this._board.players.length because if players
            // leave and then re-enter we won't be using unique ids anymore
            this._store.dispatch(registerPlayer(name, this._board.players.length, this._store));
            return true;
        }
        return false;
    }

    // Start the game loop
    // ->
    start() {
        if (this.status !== GAME_STATUS_INIT) {
            return;
        }

        this._store.dispatch(gameStart());
        for (let i = 0; i < this._board.players.length; i++) {
            const player = this._board.players[i];
            const hand = this._board._deck.draw(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            this._store.dispatch(setPlayerHand(hand, player.id));
        }
    }

    // Take an action and move through one step of the action loop
    // Action ->
    receiveAction(action) {
        if (this.status !== GAME_STATUS_RUNNING) {
            return;
        }

        if (action.playerId !== this.activePlayerIndex) {
            return;
        }

        if (this._re.isLegalAction(this._board, action)) {
            this._me.executeMove(action);
        } else {
            return;
        }
    }
}

export default Game;
