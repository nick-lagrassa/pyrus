import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import configureStore from '../../store/configureStore';
import settings from '../../config/settings';
import { gameStart, spendMove, cycleToNextPlayer, gameEnd, gameReset } from '../../actions/game';
import { registerPlayer, setPlayerHand, givePlayerCards } from '../../actions/players';
import { setPromptTestResults, setPrompt } from '../../actions/prompt';
import { GAME_STATUS_INIT, GAME_STATUS_RUNNING } from '../../constants/game';
import { activePlayerIndex } from '../../util';

class Game {
    // Prompt, Store -> Game
    constructor(prompt, streams) {
        this._store = configureStore(streams);
        this._re = new RulesEnforcer(this._store);
        this._me = new MoveExecutor(this._store);
        this._board = new Board(prompt, this._store);

        this._store.dispatch(setPrompt(prompt));
    }

    get state() {
        return this._store.getState();
    }

    get status() {
        return this._store.getState().game.status;
    }

    get turnCount() {
        return this._store.getState().game.turnCount;
    }

    get activePlayerIndex() {
        return activePlayerIndex(this.turnCount, this._board.players.length);
    }

    get activePlayer() {
        return this._board.players[this.activePlayerIndex];
    }

    get actionsRemaining() {
        console.log('in getter');
        return this._store.getState().actionsRemaining;
    }

    get numMovesRemaining() {
        return this._store.getState().game.numMovesRemaining;
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
        for (let i = 0; i < this._board.players.length; i++) {
            const player = this._board.players[i];
            const hand = this._board._deck.draw(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            this._store.dispatch(setPlayerHand(hand, player.id));
        }
    }

    // Take an move and move through one step of the move loop, returns whether
    // the move was allowed
    // Move -> bool
    receiveMove(move) {
        if (this.status !== GAME_STATUS_RUNNING) {
            return false;
        }

        if (this.activePlayer.id !== move.playerId) {
            return false;
        }

        if (this._re.isLegalMove(this._board, move)) {
            this._me.executeMove(this._board, move);
            this._store.dispatch(spendMove());

            if (this.numMovesRemaining <= 0) {
                this.endTurn();
            }

            return true;
        }

        return false;
    }

    // Remove player from game component
    // Int ->
    removePlayer(playerId) {
        this._store.dispatch(removePlayer(playerId));
    }

    // skip the current player's turn
    endTurn() {
        const cards = this._board._deck.draw(settings.NUM_CARDS_DRAWN_PER_TURN);
        console.log(this.actionsRemaining);
        if (this.actionsRemaining > 0) {
            this._store.dispatch(givePlayerCards(cards, this.activePlayer.id));
            this._store.dispatch(cycleToNextPlayer());
        } else {
            this.reset();
        }
    }

    // End the game loop
    end() {
        this._store.dispatch(gameEnd());
    }

    // Reset game state
    reset() {
        this._store.dispatch(gameReset());
        this._board._deck.shuffle();
        for (let i = 0; i < this._board.players.length; i++) {
            const player = this._board.players[i];
            const hand = this._board._deck.draw(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            this._store.dispatch(setPlayerHand(hand, player.id));
        }
    }
}

export default Game;
