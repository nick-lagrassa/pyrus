import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';
import espree from 'espree';

const ARRAY_PATTERN           = new RegExp('(\\[|\\])');
const OBJECT_PATTERN          = new RegExp('(\\{|\\})');
const FOR_PATTERN             = new RegExp('for(\\s|\\()');
const WHILE_PATTERN           = new RegExp('while(\\s{0,1}|\\()');
const DO_WHILE_PATTERN        = new RegExp('do(\\s{0,1}|\\()');
const IF_PATTERN              = new RegExp('if(\\s|\\()');
const ELSE_PATTERN            = new RegExp('else(\\s{0,1}|\\()');
const TERNARY_PATTERN         = new RegExp('\\?.*:');
const CLASS_PATTERN           = new RegExp('class\\s');
const SWITCH_CASE_PATTERN     = new RegExp('(switch|case.*:|default)');
//const HELPER_FUNCTION_PATTERN = new RegExp('^\\s*\\w+(\\(|\\s*=\\s*(function\\(|\\())');

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

    // Use abstract syntax tree of pattern string to identify if string is function declaration
    // string -> boolean
    isFunction(code) {
        const tree = espree.parse(code, { ecmaVersion: 6 });
        const declaration = tree.body[0];
        if (declaration.type === 'FunctionDeclaration') {
            return true;
        }
        else if (declaration.type === 'VariableDeclaration') {
            const expression = declaration.declarations[0].init;
            if (expression.type.includes('FunctionExpression')) {
                return true;
            }
            else if (expression.type === 'CallExpression' || expression.type === "NewExpression") {
                return expression.callee.type.includes('FunctionExpression');
            }
        }
        else if (declaration.type === "ClassDeclaration") {
            return declaration.body.body.filter(node => node.type.includes("Method")).length > 0;
        }

        return false;
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
                          SWITCH_CASE_PATTERN];
        for (let i = 0; i < patterns.length; i++) {
            const pattern = patterns[i];
            if(move.code.match(pattern)) {
                return false;
            }
        }
        if (this.isFunction(move.code)) {
            return false;
        }
        return true;
    }
}

export default RulesEnforcer;
