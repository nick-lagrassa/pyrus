import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import settings from '../../config/settings';
import { gameStart, spendMove, cycleToNextPlayer, gameEnd, gameReset } from '../../actions/game';
import { registerPlayer, setPlayerHand, givePlayerCards } from '../../actions/players';
import { setPromptTestResults, setPrompt } from '../../actions/prompt';
import { GAME_STATUS_INIT, GAME_STATUS_RUNNING } from '../../constants/game';
import { activePlayerIndex } from '../../util';

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

    get activePlayerIndex() {
        return activePlayerIndex(this.turnCount, this._board.players.length);
    }

    get activePlayer() {
        return this._board.players[this.activePlayerIndex];
    }

    set testResults(results) {
        this._store.dispatch(setPromptTestResults(results));
    }

    // String -> bool
    registerPlayer(name, playerId) {
        if (this.status !== GAME_STATUS_INIT) {
            return false;
        }

        if (this._board.players.length < settings.MAX_PLAYERS_PER_GAME) {
            this._store.dispatch(registerPlayer(name, playerId));
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
    }

    // End the game loop
    end() {
        this._store.dispatch(gameEnd());
    }
}

export default Game;
