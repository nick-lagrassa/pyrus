import { GAME_SPEND_PLAYER_ACTION } from '../../actions/game';

class MoveExecutor {
    constructor(store) {
        this._store = store;
    }

    // Performs the specified action on the board, modifying the board
    // Board, Action ->
    executeMove(board, action) {
        this._store.dispatch(spendPlayerAction());
    }    
}

export default MoveExecutor;