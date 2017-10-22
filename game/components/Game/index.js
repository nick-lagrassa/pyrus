import RulesEnforcer from '../RulesEnforcer';
import MoveExecutor from '../MoveExecutor';
import Board from '../Board';
import settings from '../../config/settings';

class Game {
    // Prompt -> Game
    constructor(prompt) {
        this._prompt = prompt;
        this._players = [];
        this._gameOver = false;
        this._re = new RulesEnforcer();
        this._me = new MoveExecutor();
        this._board = new Board(prompt);
    }

    // Attempts to add a player to the game, returns whether it was successful
    // Player -> bool
    registerPlayer(player) {
        if (this._players.length >= settings.MAX_PLAYERS_PER_GAME) {
            return false
        }

        this._players.push(player);
        return true;
    }

    // Start the game loop
    // ->
    start() {
        for (let player of this._players) {
            const hand = this._board.deck.draw(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            player.addCards(hand);
        }

        let activePlayerIndex = 0;
        while (!this._re.isGameOver(this.board)) {
            const activePlayer = this._players[activePlayerIndex];
            let numActionsUsed = 0;

            while (numActionsUsed < settings.NUM_PLAYER_ACTIONS_PER_TURN && !this._re.isGameOver(this.board)) {
                const action = activePlayer.makeAction();
                if (this._re.isLegalAction(this.board, action)) {
                    this._me.executeMove(this.board, action);
                    ++numActionsUsed;
                } else {

                }
            }

            activePlayerIndex = ++activePlayerIndex % this._players.length;
        }

        // endgame stuff
    }
}

export default Game;
