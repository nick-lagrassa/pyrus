import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import settings from '../../config/settings';
import { registerPlayer, gameStart } from '../../actions/game';
import { setPlayerHand } from '../../actions/player';

class Game {
    // Prompt -> Game
    constructor(prompt, store) {
        this._store = store;
        this._re = new RulesEnforcer();
        this._me = new MoveExecutor();
        this._board = new Board(prompt, store);
    }

    // Player -> bool
    registerPlayer(newPlayer) {
        if (this._board.players.length < settings.MAX_PLAYERS_PER_GAME) {
            this._store.dispatch(registerPlayer(newPlayer));
            return true;
        }
        return false;
    }

    // Start the game loop
    // ->
    start() {
        this._store.dispatch(gameStart());
        for (let player of this._board.players) {
            const hand = this._board.deck.draw(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            this._store.dispatch(setPlayerHand(hand));
        }

        let activePlayerIndex = 0;
        while (!this._re.isGameOver(this._board)) {
            const activePlayer = this._board.players[activePlayerIndex];
            let numActionsUsed = 0;

            while (numActionsUsed < settings.NUM_PLAYER_ACTIONS_PER_TURN && !this._re.isGameOver(this._board)) {
                const action = activePlayer.makeAction();
                if (this._re.isLegalAction(this._board, action)) {
                    this._me.executeMove(this._board, action);
                    ++numActionsUsed;
                } else {

                }
            }

            activePlayerIndex = ++activePlayerIndex % this._board.players.length;
        }

        // endgame stuff
    }
}

export default Game;
