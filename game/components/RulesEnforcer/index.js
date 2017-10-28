import { ACTION_WRITE, ACTION_DISCARD, ACTION_CONSUME } from '../../constants/action';

class RulesEnforcer {
    constructor(store) {
        this._store = store;
    }

    // Returns whether a given action is legal to perform
    // Board, Action -> bool
    isLegalAction(board, action) {
        switch(action.type) {
            case ACTION_DISCARD:
                return board.deck.cards.length > 0 && this.playerHasCard(board, action);
            default:
                return false;
        }
        return true;
    }

    playerHasCard(board, action) {
        const player = board.getPlayerById(action.player.id);
        return player.hand.filter(card => card.type === action.card.type).length > 0;
    }
}

export default RulesEnforcer;
