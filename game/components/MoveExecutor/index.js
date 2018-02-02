import {
    MOVE_CONSUME,
    MOVE_DISCARD,
    MOVE_WRITE
} from '../../constants/move';
import {
    discardPlayerCard,
    givePlayerCards
} from '../../actions/players';
import {
    updateEditor
} from '../../actions/board';

class MoveExecutor {
    constructor(store) {
        this._store = store;
    }

    // Performs the specified move on the board, modifying the board
    // Board, Move ->
    executeMove(board, move) {
        switch (move.type) {
            case MOVE_CONSUME:
                this._store.dispatch(discardPlayerCard(move.card, move.playerId));
                // TODO: add discarded card to discard pile
                // TODO: dispatch updateEditor after move.code is confirmed to be the pattern matching the card
                this._store.dispatch(updateEditor(move.code));
                break;
            case MOVE_DISCARD:
                this._store.dispatch(discardPlayerCard(move.card, move.playerId));
                // TODO: add discarded card to discard pile
                const hand = board._deck.draw(1);
                this._store.dispatch(givePlayerCards(hand, move.playerId));
                break;
            case MOVE_WRITE:
                this._store.dispatch(updateEditor(move.code));
                break;
        }
    }
}

export default MoveExecutor;
