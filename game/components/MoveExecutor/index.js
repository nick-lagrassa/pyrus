import { GAME_SPEND_PLAYER_MOVE } from '../../actions/game';

class MoveExecutor {
    constructor(store) {
        this._store = store;
    }

    // Performs the specified move on the board, modifying the board
    // Board, Move ->
    executeMove(board, move) {
        this._store.dispatch(spendPlayerMove());
    }    
}

export default MoveExecutor;