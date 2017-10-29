import {
    MOVE_CONSUME,
    MOVE_DISCARD,
    MOVE_WRITE
} from '../../constants/move';
import {
    discardPlayerCard,
    givePlayerCards
} from '../../actions/players';

class MoveExecutor {
    constructor(store) {
        this._store = store;
    }

    // Performs the specified move on the board, modifying the board
    // Board, Move ->
    executeMove(board, move) {
        switch (move.type) {
            case MOVE_CONSUME:
                this._store.dispatch(discardPlayerCard(move.card, move.player.id));
                // TODO: add discarded card to discard pile
                this._store.dispatch(updateEditor(board.editor));
                break;
            case MOVE_DISCARD:
                this._store.dispatch(discardPlayerCard(move.card, move.player.id));
                // TODO: add discarded card to discard pile
                const hand = board._deck.draw(1);
                this._store.dispatch(givePlayerCards(hand, move.player.id));
                break;
            case MOVE_WRITE:
                this._store.dispatch(updateEditor(board.editor));
                break;
        }
    }    
}

export default MoveExecutor;