import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';

class RulesEnforcer {
    constructor(store) {
        this._store = store;
    }

    // Returns whether a given move is legal to perform
    // Board, Move -> bool
    isLegalMove(board, move) {
        switch(move.type) {
            case MOVE_DISCARD:
                return board.deck.cards.length > 0 && this.playerHasCard(board, move);
            default:
                return false;
        }
        return true;
    }

    playerHasCard(board, move) {
        const player = board.getPlayerById(move.player.id);
        return player.hand.filter(card => card.type === move.card.type).length > 0;
    }
}

export default RulesEnforcer;
