import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import settings from '../../config/settings';
import { gameStart, spendMove, cycleToNextPlayer } from '../../actions/game';
import { registerPlayer, setPlayerHand, givePlayerCards } from '../../actions/players';
import { setPrompt } from '../../actions/prompt';
import { GAME_STATUS_INIT, GAME_STATUS_RUNNING } from '../../constants/game';

class Game {
    // Prompt, Store -> Game
    constructor(prompt, store) {
        this._store = store;
        this._re = new RulesEnforcer(store);
        this._me = new MoveExecutor(store);
        this._board = new Board(prompt, store);

        this._store.dispatch(setPrompt(prompt));
    }

    get status() {
        return this._store.getState().game.status;
    }

    get turnCount() {
        return this._store.getState().game.turnCount;
    }

    get activePlayerIndex() {
        return this.turnCount % this._board.players.length;
    }

    get activePlayer() {
        return this._board.players[this.activePlayerIndex];
    }

    get numMovesRemaining() {
        return this._store.getState().game.numMovesRemaining;
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

    // Take an move and move through one step of the move loop
    // Move ->
    receiveMove(move) {
        if (this.status !== GAME_STATUS_RUNNING) {
            return;
        }

        if (this.activePlayer.id !== move.player.id) {
            return;
        }

        if (this._re.isLegalMove(this._board, move)) {
            this._me.executeMove(this._board, move);
            this._store.dispatch(spendMove());

            if (this.numMovesRemaining <= 0) {
                const cards = this._board._deck.draw(settings.NUM_CARDS_DRAWN_PER_TURN);
                this._store.dispatch(givePlayerCards(cards, this.activePlayer.id));
                this._store.dispatch(cycleToNextPlayer());
            }
        } else {
            return;
        }
    }
}

export default Game;
