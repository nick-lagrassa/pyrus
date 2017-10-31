import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';

const ARRAY_PATTERN           = new RegExp("(\\[|\\])");
const OBJECT_PATTERN          = new RegExp("(\\{|\\})");
const FOR_PATTERN             = new RegExp("for(\\s|\\()");
const WHILE_PATTERN           = new RegExp("while(\\s{0,1}|\\()");
const DO_WHILE_PATTERN        = new RegExp("do(\\s{0,1}|\\()");
const IF_PATTERN              = new RegExp("if(\\s|\\()");
const ELSE_PATTERN            = new RegExp("else(\\s{0,1}|\\()");
const TERNARY_PATTERN         = new RegExp("\\?.*:");
const CLASS_PATTERN           = new RegExp("class\\s");
const SWITCH_CASE_PATTERN     = new RegExp("(switch|case.*:|default)");
const HELPER_FUNCTION_PATTERN = new RegExp("^\\s*\\w+(\\(|\\s*=\\s*(function\\(|\\())");

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
            case MOVE_CONSUME:
                return this.playerHasCard(board, move);
            case MOVE_WRITE:
                return this.isPrimitiveWrite(board, move);
            default:
                return false;
        }
        return true;
    }

    playerHasCard(board, move) {
        const player = board.getPlayerById(move.player.id);
        return player.hand.filter(card => card.type === move.card.type).length > 0;
    }

    isPrimitiveWrite(board, move) {
        const patterns = [ARRAY_PATTERN,
                          OBJECT_PATTERN,
                          FOR_PATTERN,
                          WHILE_PATTERN,
                          DO_WHILE_PATTERN,
                          IF_PATTERN,
                          ELSE_PATTERN,
                          TERNARY_PATTERN,
                          CLASS_PATTERN,
                          SWITCH_CASE_PATTERN,
                          HELPER_FUNCTION_PATTERN];
        for (let i = 0; i < patterns.length; i++) {
            const pattern = patterns[i];
            if(move.code.match(pattern)) {
                return false;
            }
        }
        return true;
    }
}

export default RulesEnforcer;
